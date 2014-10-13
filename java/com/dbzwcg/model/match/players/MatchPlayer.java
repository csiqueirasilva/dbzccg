/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.players;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.mainpersonality.MatchMainPersonality;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.users.user.User;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@SequenceGenerator(name = MatchPlayer.SEQUENCE_NAME, sequenceName = MatchPlayer.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
public class MatchPlayer implements Serializable {
//    {name: 'CPU', mainPersonality: {alignment: DBZCCG.Personality.alignment.Villain, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
//                    angerLevelNeededToLevel: 5, personalities: [DBZCCG.Saiyan['173'], DBZCCG.Saiyan['174'], DBZCCG.Saiyan['175']]}
    /* JSON : id */

    public final static String SEQUENCE_NAME = "seq_match_player";

    @JoinColumn
    @ManyToOne( cascade = CascadeType.ALL)
    private Match match;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column
    private Integer id;

    @ManyToOne( optional = false)
    @JoinColumn
    private User player;

    @Column
    private String name;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup lifeDeck;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup discardPile;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup hand;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup removedFromTheGame;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup inPlay;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup dragonballs;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup nonCombats;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true, mappedBy = "owner")
    private MatchCardGroup setAside;

    @OneToOne( cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    private MatchMainPersonality mainPersonality;
    
    @OneToOne( cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn 
    private MatchPersonality personalityInControl;

    @Column(name = "canLose")
    private Boolean canLose;

    @Column(name = "loser")
    private Boolean loser;

    @Column(name = "handOnTable")
    private Boolean handOnTable;

    @Column(name = "canmppwin")
    private Boolean canMPPWin;
    @Column(name = "candbwin")
    private Boolean canDBWin;
    @Column(name = "skipCombatPhase")
    private Boolean skipCombatPhase;
    @Column(name = "skipDiscardPhase")
    private Boolean skipDiscardPhase;
    @Column(name = "skipDrawPhase")
    private Boolean skipDrawPhase;
    @Column(name = "skipPowerUpPhase")
    private Boolean skipPowerUpPhase;
    @Column(name = "skipRejuvenationPhase")
    private Boolean skipRejuvenationPhase;
    @Column(name = "skipDeclarePhase")
    private Boolean skipDeclarePhase;
    @Column(name = "skipNonCombatPhase")
    private Boolean skipNonCombatPhase;
    @Column(name = "skipAttackerPhase")
    private Boolean skipAttackerPhase;
    @Column(name = "skipDefenderPhase")
    private Boolean skipDefenderPhase;
    @Column(name = "drawPhaseQuantityDraw")
    private Integer drawPhaseQuantityDraw;
    @Column
    private Integer discardPhaseHandSize;
    @Column
    private Integer combatPhaseDefenderDraw;

    @Column
    private Boolean connected = true;

    public Boolean isConnected() {
        return connected;
    }

    public void setConnected(Boolean connected) {
        this.connected = connected;
    }
    
    public MatchPersonality getPersonalityInControl() {
        return personalityInControl;
    }

    public void setPersonalityInControl(MatchPersonality personalityInControl) {
        this.personalityInControl = personalityInControl;
    }

    public Integer getCombatPhaseDefenderDraw() {
        return combatPhaseDefenderDraw;
    }

    public void setCombatPhaseDefenderDraw(Integer combatPhaseDefenderDraw) {
        this.combatPhaseDefenderDraw = combatPhaseDefenderDraw;
    }

    public Boolean getSkipAttackerPhase() {
        return skipAttackerPhase;
    }

    public void setSkipAttackerPhase(Boolean skipAttackerPhase) {
        this.skipAttackerPhase = skipAttackerPhase;
    }

    public Boolean getSkipDefenderPhase() {
        return skipDefenderPhase;
    }

    public void setSkipDefenderPhase(Boolean skipDefenderPhase) {
        this.skipDefenderPhase = skipDefenderPhase;
    }

    public Boolean getSkipCombatPhase() {
        return skipCombatPhase;
    }

    public void setSkipCombatPhase(Boolean skipCombatPhase) {
        this.skipCombatPhase = skipCombatPhase;
    }

    public Integer getDiscardPhaseHandSize() {
        return discardPhaseHandSize;
    }

    public void setDiscardPhaseHandSize(Integer discardPhaseHandSize) {
        this.discardPhaseHandSize = discardPhaseHandSize;
    }

    public Boolean getSkipDiscardPhase() {
        return skipDiscardPhase;
    }

    public void setSkipDiscardPhase(Boolean skipDiscardPhase) {
        this.skipDiscardPhase = skipDiscardPhase;
    }

    public Boolean getSkipDrawPhase() {
        return skipDrawPhase;
    }

    public void setSkipDrawPhase(Boolean skippedDrawPhase) {
        this.skipDrawPhase = skippedDrawPhase;
    }

    public Boolean getSkipPowerUpPhase() {
        return skipPowerUpPhase;
    }

    public void setSkipPowerUpPhase(Boolean skipPowerUpPhase) {
        this.skipPowerUpPhase = skipPowerUpPhase;
    }

    public Boolean getSkipRejuvenationPhase() {
        return skipRejuvenationPhase;
    }

    public void setSkipRejuvenationPhase(Boolean skipRejuvenationPhase) {
        this.skipRejuvenationPhase = skipRejuvenationPhase;
    }

    public Boolean getSkipDeclarePhase() {
        return skipDeclarePhase;
    }

    public void setSkipDeclarePhase(Boolean skipDeclarePhase) {
        this.skipDeclarePhase = skipDeclarePhase;
    }

    public Boolean getSkipNonCombatPhase() {
        return skipNonCombatPhase;
    }

    public void setSkipNonCombatPhase(Boolean skipNonCombatPhase) {
        this.skipNonCombatPhase = skipNonCombatPhase;
    }

    public Integer getDrawPhaseQuantityDraw() {
        return drawPhaseQuantityDraw;
    }

    public void setDrawPhaseQuantityDraw(Integer drawPhaseQuantityDraw) {
        this.drawPhaseQuantityDraw = drawPhaseQuantityDraw;
    }

    public Player getPlayer() {
        return (Player) player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Boolean getCanMPPWin() {
        return canMPPWin;
    }

    public void setCanMPPWin(Boolean canMPPWin) {
        this.canMPPWin = canMPPWin;
    }

    public Boolean getCanDBWin() {
        return canDBWin;
    }

    public void setCanDBWin(Boolean canDBWin) {
        this.canDBWin = canDBWin;
    }

    public Boolean getHandOnTable() {
        return handOnTable;
    }

    public void setHandOnTable(Boolean handOnTable) {
        this.handOnTable = handOnTable;
    }

    public Boolean getCanLose() {
        return canLose;
    }

    public void setCanLose(Boolean canLose) {
        this.canLose = canLose;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getLoser() {
        return loser;
    }

    public void setLoser(Boolean loser) {
        this.loser = loser;
    }

    public MatchMainPersonality getMainPersonality() {
        return mainPersonality;
    }

    public void setMainPersonality(MatchMainPersonality mainPersonality) {
        this.mainPersonality = mainPersonality;
    }

    public MatchCardGroup getLifeDeck() {
        return lifeDeck;
    }

    public void setLifeDeck(MatchCardGroup lifeDeck) {
        this.lifeDeck = lifeDeck;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MatchCardGroup getDiscardPile() {
        return discardPile;
    }

    public void setDiscardPile(MatchCardGroup discardPile) {
        this.discardPile = discardPile;
    }

    public MatchCardGroup getHand() {
        return hand;
    }

    public void setHand(MatchCardGroup hand) {
        this.hand = hand;
    }

    public MatchCardGroup getRemovedFromTheGame() {
        return removedFromTheGame;
    }

    public void setRemovedFromTheGame(MatchCardGroup removedFromTheGame) {
        this.removedFromTheGame = removedFromTheGame;
    }

    public MatchCardGroup getInPlay() {
        return inPlay;
    }

    public void setInPlay(MatchCardGroup inPlay) {
        this.inPlay = inPlay;
    }

    public MatchCardGroup getDragonballs() {
        return dragonballs;
    }

    public void setDragonballs(MatchCardGroup dragonballs) {
        this.dragonballs = dragonballs;
    }

    public MatchCardGroup getNonCombats() {
        return nonCombats;
    }

    public void setNonCombats(MatchCardGroup nonCombats) {
        this.nonCombats = nonCombats;
    }

    public MatchCardGroup getSetAside() {
        return setAside;
    }

    public void setSetAside(MatchCardGroup setAside) {
        this.setAside = setAside;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}
