package com.dbzwcg.model.match.log;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.callbacks.maps.CallbackMapDLO;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.interfaces.UseWhenNeededEffect;
import com.dbzwcg.model.match.log.creator.CardMatchEventCreator;
import com.dbzwcg.model.match.log.creator.GameMechanicMatchEventCreator;
import com.dbzwcg.model.match.log.creator.MatchEventCreator;
import com.dbzwcg.model.match.log.creator.PlayerMatchEventCreator;
import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@SequenceGenerator(name = MatchEvent.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class MatchEvent implements Serializable {

    public final static String SEQUENCE_NAME = "seq_match_event";

    @OneToOne( cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn
    protected MatchEventCreator sourceActor;
    
    @OneToOne( cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn
    protected MatchEventCreator targetActor;
    
    @JoinColumn
    @OneToOne( cascade = CascadeType.ALL)
    protected MatchPlayer player;

    @Column
    protected Class nextEvent;
    
    @JoinTable
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    protected List<DateTime> interruptions;
    
    @Column
    protected Integer interruptionCursor; // probably private

    @Column
    protected Boolean displayableToUser;
    
    @Id
    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
    private Integer id;

    protected abstract void phaseEffect(Match m);

    public abstract String logMessage();

    public abstract void applyFromDatabase(Match m);

    private Boolean checkCardGroupUseWhenNeeded(List mcg, Match m, MatchPlayer player, Boolean before) {
        Boolean ret = false;
        for (Object o : mcg) {
            MatchCard c = (MatchCard) o;
            if (c.getEffect() instanceof UseWhenNeededEffect) {
                ret = ret || ((UseWhenNeededEffect) c.getEffect()).checkUseWhenNeeded(m, this, player, before);
            }
        }
        return ret;
    }

    private Boolean checkUseWhenNeeded(Match m, Boolean before) { /* Before and After */

        Boolean ret = false;
        MatchPlayer firstToCheck;

        if (this.player == null) {
            Phase phase = m.getCurrentPhase();
            if (phase instanceof CombatPhase) {
                CombatPhase combat = (CombatPhase) phase;
                if (combat.getPhases().size() > 0) {
                    firstToCheck = CombatPhaseDLO.getLastInternalPhase(combat).getAttackingPlayer();
                } else {
                    firstToCheck = combat.getDeclaringPlayer();
                }
            } else if (m.getTurns().size() > 0) {
                firstToCheck = m.getTurns().get(m.getTurns().size() - 1).getOwner();
            } else {
                throw new UnsupportedOperationException("ERROR WHILE CHECKING USE WHEN NEEDED EFFECTS - NO POSSIBLE PLAYER IS SET");
            }
        } else {
            firstToCheck = this.player;
        }

        int i = m.getPlayers().indexOf(firstToCheck);
        int playerIndex = i;
        do {
            MatchPlayer p = m.getPlayers().get(i);
            ret = ret || this.checkCardGroupUseWhenNeeded(p.getDiscardPile(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getLifeDeck(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getRemovedFromTheGame(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getSetAside(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getMainPersonality().getPersonalities(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getDragonballs(), m, p, before)
                    || this.checkCardGroupUseWhenNeeded(p.getNonCombats(), m, p, before);
            i = (i + 1) % m.getPlayers().size();
        } while (i != playerIndex);

        if (ret) {
            DateTime dt = new DateTime();
            this.interruptions.add(dt);
        }

        return ret;
    }

    protected Object getSourceRawObject() {
        Object creator = null;
        if (this.sourceActor instanceof GameMechanicMatchEventCreator) {
            creator = ((GameMechanicMatchEventCreator) this.sourceActor).getGameMechanic();
        } else if (this.sourceActor instanceof CardMatchEventCreator) {
            creator = ((CardMatchEventCreator) this.sourceActor).getCard();
        } else if (this.sourceActor instanceof PlayerMatchEventCreator) {
            creator = ((PlayerMatchEventCreator) this.sourceActor).getPlayer();
        }
        return creator;
    }

    public void resolveEffect(Match m) {
        if (!this.checkUseWhenNeeded(m, true)) {
            CallbackReturn ret = CallbackMapDLO.solveCallbacks(m.getCallbacks(), m, this);

            if (ret == null || !ret.getSkipEventEffect()) {
                phaseEffect(m);
            }

            if (!this.checkUseWhenNeeded(m, false)) {
                if (this.nextEvent != null && (ret == null || !ret.getSkipHookedEvent())) {
                    MatchEvent bdpe;

                    try {
                        Object creator = this.getSourceRawObject();

                        if (creator != null) {
                            bdpe = (MatchEvent) nextEvent.getConstructor(GameMechanic.class, MatchPlayer.class).newInstance(creator, this.player);
                            MatchDLO.applyEvent(m, bdpe);
                        }
                    } catch (NoSuchMethodException | SecurityException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
                        Logger.getLogger(MatchEvent.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            } else {
                if (this.nextEvent != null && (ret == null || !ret.getSkipHookedEvent())) {
                    MatchEvent bdpe;

                    try {
                        Object creator = this.getSourceRawObject();
                        bdpe = (MatchEvent) nextEvent.getConstructor(GameMechanic.class, MatchPlayer.class).newInstance(creator, this.player);
                        ResumeEvent re = new ResumeEvent(bdpe);
                        MatchDLO.applyResumeEvent(m, re);
                    } catch (NoSuchMethodException | SecurityException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
                        Logger.getLogger(MatchEvent.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        } else {
            ResumeEvent re = new ResumeEvent(this);
            MatchDLO.applyResumeEvent(m, re);
        }
    }

    // CONSTRUCTORS
    protected MatchEvent() {
        this.interruptions = new ArrayList<>();
        this.displayableToUser = false;
    }

    public MatchEvent(MatchCard card) {
        this();
        this.targetActor = this.sourceActor = new CardMatchEventCreator();
        ((CardMatchEventCreator) this.sourceActor).setCard(card);
        ((CardMatchEventCreator) this.targetActor).setCard(card);
    }

    public MatchEvent(MatchCard sourceCard, MatchCard targetCard) {
        this();
        this.sourceActor = new CardMatchEventCreator();
        this.targetActor = new CardMatchEventCreator();
        ((CardMatchEventCreator) this.sourceActor).setCard(sourceCard);
        ((CardMatchEventCreator) this.targetActor).setCard(targetCard);
    }

    public MatchEvent(MatchPlayer generator) {
        this();
        this.targetActor = this.sourceActor = new PlayerMatchEventCreator();
        ((PlayerMatchEventCreator) this.sourceActor).setPlayer(generator);
    }

    public MatchEvent(GameMechanic generator) {
        this();
        this.targetActor = this.sourceActor = new GameMechanicMatchEventCreator();
        ((GameMechanicMatchEventCreator) this.sourceActor).setGameMechanic(generator);
    }

    public MatchEvent(MatchPlayer generator, MatchPlayer target) {
        this();
        this.sourceActor = new PlayerMatchEventCreator();
        this.targetActor = new PlayerMatchEventCreator();
        ((PlayerMatchEventCreator) this.sourceActor).setPlayer(generator);
        ((PlayerMatchEventCreator) this.targetActor).setPlayer(target);
    }

    public MatchEvent(GameMechanic generator, MatchPlayer target) {
        this();
        this.sourceActor = new GameMechanicMatchEventCreator();
        this.targetActor = new PlayerMatchEventCreator();
        ((GameMechanicMatchEventCreator) this.sourceActor).setGameMechanic(generator);
        ((PlayerMatchEventCreator) this.targetActor).setPlayer(target);
    }

    public MatchEvent(GameMechanic generator, MatchCard target) {
        this();
        this.sourceActor = new GameMechanicMatchEventCreator();
        this.targetActor = new CardMatchEventCreator();
        ((GameMechanicMatchEventCreator) this.sourceActor).setGameMechanic(generator);
        ((CardMatchEventCreator) this.targetActor).setCard(target);
    }

    public MatchEvent(MatchCard source, MatchPlayer target) {
        this();
        this.sourceActor = new CardMatchEventCreator();
        this.targetActor = new PlayerMatchEventCreator();
        ((CardMatchEventCreator) this.sourceActor).setCard(source);
        ((PlayerMatchEventCreator) this.targetActor).setPlayer(target);
    }

    public MatchEvent(MatchPlayer source, MatchCard target) {
        this();
        this.sourceActor = new PlayerMatchEventCreator();
        this.targetActor = new CardMatchEventCreator();
        ((PlayerMatchEventCreator) this.sourceActor).setPlayer(source);
        ((CardMatchEventCreator) this.targetActor).setCard(target);
    }

    public MatchEvent(MatchCard source, GameMechanic target) {
        this();
        this.sourceActor = new CardMatchEventCreator();
        this.targetActor = new GameMechanicMatchEventCreator();
        ((CardMatchEventCreator) this.sourceActor).setCard(source);
        ((GameMechanicMatchEventCreator) this.targetActor).setGameMechanic(target);
    }

    /* GETTER AND SETTERS */
    public MatchPlayer getPlayer() {
        return player;
    }

    public void setPlayer(MatchPlayer player) {
        this.player = player;
    }

    public Class getNextEvent() {
        return nextEvent;
    }

    public void setNextEvent(Class nextEvent) {
        this.nextEvent = nextEvent;
    }

    public List<DateTime> getInterruptions() {
        return interruptions;
    }

    public void setInterruptions(List<DateTime> interruptions) {
        this.interruptions = interruptions;
    }

    public Integer getInterruptionCursor() {
        return interruptionCursor;
    }

    public void setInterruptionCursor(Integer interruptionCursor) {
        this.interruptionCursor = interruptionCursor;
    }

    public MatchEventCreator getSourceActor() {
        return sourceActor;
    }

    public void setSourceActor(MatchEventCreator sourceActor) {
        this.sourceActor = sourceActor;
    }

    public MatchEventCreator getTargetActor() {
        return targetActor;
    }

    public void setTargetActor(MatchEventCreator targetActor) {
        this.targetActor = targetActor;
    }

    public Boolean isDisplayableToUser() {
        return displayableToUser;
    }

    public void setDisplayableToUser(Boolean displayableToUser) {
        this.displayableToUser = displayableToUser;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
