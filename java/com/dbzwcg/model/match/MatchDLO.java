/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.sourcecards.personalities.PersonalityCard;
import com.dbzwcg.model.decks.Deck;
import com.dbzwcg.model.decks.DeckDLO;
import com.dbzwcg.model.decks.DeckEligibleReference;
import com.dbzwcg.model.events.GameStartEvent;
import com.dbzwcg.model.events.cardmove.failures.MatchCardGroupOutOfCardsEvent;
import com.dbzwcg.model.events.gameover.GameOverVictoryEvent;
import com.dbzwcg.model.events.gameover.LifeCardGameOverEvent;
import com.dbzwcg.model.gamemechanics.GameOver;
import com.dbzwcg.model.gamemechanics.GameStart;
import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.gamemechanics.turns.TurnDLO;
import com.dbzwcg.model.match.callbacks.maps.CallbackMap;
import com.dbzwcg.model.match.card.effects.floatings.FloatingEffect;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.mainpersonality.MatchMainPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;
import com.dbzwcg.model.match.physicaltables.CCGSaiyanSagaPhysicalAttackTable;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTable;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.queues.QueueReadyAnswer;
import com.dbzwcg.model.match.queues.QueuedPlayer;
import com.dbzwcg.model.match.types.CardFieldType;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.LimitType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.model.users.user.UserDLO;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Queue;
import java.util.Stack;
import java.util.logging.Logger;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class MatchDLO {

    @Autowired
    private MatchDAO dao;

    @Autowired
    private DeckDLO deckDLO;
    
    public static Turn getLastTurn(Match m) {
        return m.getTurns().get(m.getTurns().size() - 1);
    }

    public static Turn addTurn(Match m, MatchPlayer player) {
        Turn turn = TurnDLO.createTurn(m.getTurns().size() + 1, player);
        m.getTurns().add(turn);
        return turn;
    }

    public static Boolean checkEventPossible(MatchPlayer p, MatchEvent e) {
        Boolean ret = true;

        return ret;
    }

    public static Boolean validateUnfinishedMatch(Match m) {
        return m != null && m.getTerminated() == false && m.getPastEvents() != null && m.getQueuedEvents() != null;
    }

    public static void resolveEvent(Match m, MatchEvent nextEvent) {
        m.getPastEvents().add(nextEvent);
        nextEvent.resolveEffect(m);
        if (nextEvent.isDisplayableToUser()) {
            System.out.println(nextEvent.logMessage());
        }
    }

    public static void resolveQueuedEvents(Match m) {
        while (MatchDLO.validateUnfinishedMatch(m)
                && (m.getResumeEvents().size() > 0
                || m.getQueuedEvents().size() > 0)
                && !m.getWaitingExternalInteraction()) {

            MatchEvent nextEvent;

            if (m.getResumeEvents().size() > 0) {
                nextEvent = m.getResumeEvents().pop();
            } else {
                nextEvent = m.getQueuedEvents().poll();
            }

            MatchDLO.resolveEvent(m, nextEvent);
            MatchDLO.setInterruptedIntoResumeQueue(m);
        }
    }

    public static Boolean applyResumeEvent(Match m, MatchEvent e) {
        Boolean ret = false;
        if (MatchDLO.validateUnfinishedMatch(m)) {
            m.getResumeEvents().push(e);
            ret = true;
        }
        return ret;
    }

    public static Boolean setInterruptedIntoResumeQueue(Match m) {
        Boolean ret = false;
        if (m.getInterruptedEvents().size() > 0) {
            List<MatchEvent> list = (List<MatchEvent>) m.getInterruptedEvents();
            for (int i = list.size() - 1; i >= 0; i--) {
                MatchEvent it = list.remove(i);
                MatchDLO.applyResumeEvent(m, it);
            }
            ret = true;
        }
        return ret;
    }

    public static Boolean setRegularIntoInterruptedQueue(Match m) {
        Boolean ret = false;
        if (m.getQueuedEvents().size() > 0) {
            Queue<MatchEvent> list = m.getQueuedEvents();
            for (int i = list.size() - 1; i >= 0; i--) {
                MatchEvent event = list.poll();
                MatchDLO.applyInterruptedEvent(m, event);
            }
            ret = true;
        }
        return ret;
    }

    public static Boolean setResumeIntoRegularQueue(Match m) {
        Boolean ret = false;
        if (m.getResumeEvents().size() > 0) {
            Stack<MatchEvent> list = m.getResumeEvents();
            for (int i = list.size() - 1; i >= 0; i--) {
                MatchEvent event = list.remove(i);
                MatchDLO.applyEvent(m, event);
            }
            ret = true;
        }
        return ret;
    }

    public static Boolean applyInterruptedEvent(Match m, MatchEvent e) {
        Boolean ret = false;
        if (MatchDLO.validateUnfinishedMatch(m)) {
            m.getInterruptedEvents().add(e);
            ret = true;
        }
        return ret;
    }

    public static Boolean applyEvent(Match m, MatchEvent e) {
        Boolean ret = false;
        if (MatchDLO.validateUnfinishedMatch(m)) {
            m.getQueuedEvents().add(e);
            ret = true;
        }
        return ret;
    }

    public List<DeckEligibleReference> listPlayerDeckEligibility(Player p) {
        List<Deck> decks = deckDLO.getDecksByUser(p);
        List<DeckEligibleReference> refs = new ArrayList<>();

        for (Deck deck : decks) {
            DeckEligibleReference ref = new DeckEligibleReference();
            refs.add(ref);
            ref.setDeck(deck);
            Map<CollectionType, Boolean> eligibleMap = new HashMap<>();
            for (CollectionType type : CollectionType.values()) {
                eligibleMap.put(type, deckDLO.checkDeckPlayable(deck, type));
            }
            ref.setEligible(eligibleMap);
        }

        return refs;
    }

    public Match createMatch(PhysicalAttackTable pat, MatchType type, Collection<CollectionType> validCollections) {
        Match m = new Match();
        m.setTerminated(false);
        m.setWaitingExternalInteraction(false);
        m.setCreation(new DateTime());
        List<MatchEvent> pastEvents = new ArrayList<>();
        List<MatchPlayer> players = new ArrayList<>();
        Queue<MatchEvent> queuedEvents = new LinkedList<>();
        List<Turn> turns = new ArrayList<>();
        Stack<MatchEvent> resumeEvents = new Stack<>();
        Queue<MatchEvent> interruptedEvents = new LinkedList<>();
        List<FloatingEffect> floatingEffects = new ArrayList<>();
        m.setFloatingEffects(floatingEffects);
        m.setTurns(turns);
        m.setValidCollections(validCollections);
        m.setType(type);
        m.setQueuedEvents(queuedEvents);
        m.setPastEvents(pastEvents);
        m.setResumeEvents(resumeEvents);
        m.setInterruptedEvents(interruptedEvents);
        m.setPlayers(players);
        m.setCallbacks(new CallbackMap());
        m.setPat(pat);
        return m;
    }

    public Integer startMatch(PhysicalAttackTable narrowPhysicalAttackTable, MatchType narrowType, Collection<CollectionType> narrowValidCollections, List<QueueReadyAnswer> answers) {
        Match m = this.createMatch(narrowPhysicalAttackTable, narrowType, narrowValidCollections);
        for(QueueReadyAnswer answer : answers) {
            QueuedPlayer q = answer.getPlayer();
            Player p = q.getPlayer();
            Deck d = q.getDeck();
            MatchPlayer matchPlayer = assemblePlayerMatchData(m, d.getId(), p);
            m.getPlayers().add(matchPlayer);
        }
        
        m.getQueuedEvents().add(new GameStartEvent(new GameStart(), m));
        
        return dao.persistMatchToDatabase(m).getId();
    }

/*    
    public void main(String args[]) {
        // disable hibernate log
        Logger log = Logger.getLogger("org.hibernate");
//        log.setLevel(Level.OFF);

        // disable c3p0 log
        // src: http://stackoverflow.com/questions/2976308/how-do-i-turn-off-logging-in-java-c3p0-connection-pooling-lib
        Properties p = new Properties(System.getProperties());
        p.put("com.mchange.v2.log.MLog", "com.mchange.v2.log.FallbackMLog");
        p.put("com.mchange.v2.log.FallbackMLog.DEFAULT_CUTOFF_LEVEL", "OFF");
        //      System.setProperties(p);

        CollectionType[] validCollections = {CollectionType.COLLECTIBLE_CARD_GAME};
        PhysicalAttackTable pat = new CCGSaiyanSagaPhysicalAttackTable();
        Match m = this.createMatch(pat, MatchType.AI_MIRROR, Arrays.asList(validCollections));
        AIPlayer aiPlayer1 = AIPlayerDLO.createFromPlayer((Player) UserDLO.getUserFromUsername("root@dbzwcg.com"));
        AIPlayer aiPlayer2 = AIPlayerDLO.createFromPlayer((Player) UserDLO.getUserFromUsername("root@dbzwcg.com"));

        aiPlayer1.setDisplayName("AI PLAYER #1");
        aiPlayer2.setDisplayName("AI PLAYER #2");

        MatchPlayer p1 = assemblePlayerMatchData(m, 8, aiPlayer1);
        MatchPlayer p2 = assemblePlayerMatchData(m, 8, aiPlayer2);

        m.getPlayers().add(p1);
        m.getPlayers().add(p2);

        m.getQueuedEvents().add(new GameStartEvent(new GameStart(), m));

        resolveQueuedEvents(m);
    }
*/
    public MatchPlayer assemblePlayerMatchData(Match m, Integer deckId, Player player) {
        Deck d = deckDLO.getDeckById(deckId);
        MatchPlayer p = null;

        if (d != null && d.getOwner() != null && d.getOwner().getEmail() != null
                && player != null && player.getEmail() != null
                && d.getOwner().getEmail().equals(player.getEmail())) {
            p = getAsMatchPlayer(m, d, player);
            MatchDLO.setRegularIntoInterruptedQueue(m);
            MatchDLO.setInterruptedIntoResumeQueue(m);
        }

        return p;
    }

    public MatchPlayer getAsMatchPlayer(Match m, Deck deck, Player player) {
        MatchPlayer p = new MatchPlayer();

        if(!deck.getOwner().getId().equals(player.getId()) && !(player instanceof AIPlayer)) {
            throw new UnsupportedOperationException("Deck ID " + deck.getId() + " doesn't belong to player ID " + player.getId() + ".");
        }
        
        MatchMainPersonality mp = new MatchMainPersonality();

        if (deck.getAlignment() != null) {
            mp.setAlignment(deck.getAlignment().ordinal());
        }

        mp.setAngerLevelNeededToLevel(LimitType.BEGINNING_ANGER_NEEDED_TO_LEVEL.getValue());
        mp.setCurrentPersonalityLevel(LimitType.BEGINNING_MAIN_PERSONALITY_LEVEL.getValue());
        mp.setCurrentPowerStageAboveZero(LimitType.BEGINNING_POWER_STAGE.getValue());
        mp.setCurrentAngerLevel(LimitType.BEGINNING_ANGER_LEVEL.getValue());
        mp.setPowerUpRatingModifier(LimitType.BEGINNING_POWER_UP_RATING_MODIFIER.getValue());

        p.setName(player.getDisplayName());

        InstancedCard[] mainPersonalityFinalList = new InstancedCard[deck.getMainPersonality().size()];

        int addedLevel = LimitType.LEVEL_MIN.getValue() - 1;
        for (int i = 0; i < mainPersonalityFinalList.length; i++) {
            int level = ((PersonalityCard) deck.getMainPersonality().get(0).getSourceCard()).getPersonalityLevel();
            int index = 0;
            for (int j = 1; j < deck.getMainPersonality().size(); j++) {
                int itLevel = ((PersonalityCard) deck.getMainPersonality().get(j).getSourceCard()).getPersonalityLevel();
                if (itLevel < level && itLevel > addedLevel) {
                    index = j;
                    level = itLevel;
                }
            }
            mainPersonalityFinalList[i] = deck.getMainPersonality().get(index);
            addedLevel = level;
        }

        mp.setPersonalities(MatchCardGroupDLO.createListMatchCard(m, Arrays.asList(mainPersonalityFinalList), p, CardFieldType.mainPersonality));

        MatchPersonalityDLO.playMainPersonality(m, p, mp);

        MatchCardGroup lifeDeck = MatchCardGroupDLO.createListMatchCard(m, deck.getCards(), p, CardFieldType.lifeDeck);
        MatchCardGroup discardPile = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.discardPile);
        MatchCardGroup dragonballs = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.dragonballs);
        MatchCardGroup nonCombats = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.nonCombats);
        MatchCardGroup inPlay = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.inPlay);
        MatchCardGroup hand = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.hand);
        MatchCardGroup removedFromTheGame = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.removedFromTheGame);
        MatchCardGroup setAside = MatchCardGroupDLO.createListMatchCard(m, new ArrayList(), p, CardFieldType.setAside);

        p.setHandOnTable(false);
        p.setLoser(false);
        p.setCanLose(true);
        p.setCanDBWin(true);
        p.setCanMPPWin(true);

        p.setSkipDrawPhase(false);
        p.setSkipNonCombatPhase(false);
        p.setSkipPowerUpPhase(false);
        p.setSkipDeclarePhase(false);
        p.setSkipCombatPhase(false);
        p.setSkipDiscardPhase(false);
        p.setSkipRejuvenationPhase(false);
        p.setSkipAttackerPhase(false);
        p.setSkipDefenderPhase(false);

        p.setDrawPhaseQuantityDraw(LimitType.DRAW_PHASE_QUANTITY_DEFAULT.getValue());
        p.setDiscardPhaseHandSize(LimitType.DISCARD_PHASE_LIMIT_DEFAULT.getValue());
        p.setCombatPhaseDefenderDraw(LimitType.COMBAT_PHASE_DEFENDER_QUANTITY_DEFAULT.getValue());

        p.setRemovedFromTheGame(removedFromTheGame);
        p.setSetAside(setAside);
        p.setDragonballs(dragonballs);
        p.setDiscardPile(discardPile);
        p.setNonCombats(nonCombats);
        p.setInPlay(inPlay);
        p.setHand(hand);
        p.setLifeDeck(lifeDeck);

        p.setPlayer(player);

        return p;
    }

    private static void clearEventQueues(Match m) {
        m.getQueuedEvents().clear();
        m.getResumeEvents().clear();
        m.getInterruptedEvents().clear();
    }

    public static void lifeCardGameOver(Match m, MatchPlayer p) {
        if (p.getCanLose()) {
            MatchDLO.clearEventQueues(m);
            GameOver go = new GameOver();
            MatchCardGroupOutOfCardsEvent mcge = new MatchCardGroupOutOfCardsEvent(go, p, p.getLifeDeck());
            MatchDLO.applyEvent(m, mcge);
            LifeCardGameOverEvent goe = new LifeCardGameOverEvent(go, p);
            MatchDLO.applyEvent(m, goe);
        }
    }

    public static void setMatchWinner(Match m, MatchPlayer p) {
        m.getQueuedEvents().clear();
        GameOverVictoryEvent gove = new GameOverVictoryEvent(new GameOver(), p);
        MatchDLO.applyEvent(m, gove);
    }

    public static void applyFloatingEffect(Match m, FloatingEffect effect) {
        if (m.getFloatingEffects().indexOf(effect) == -1) {
            m.getFloatingEffects().add(effect);
            effect.enterGame(m);
        }
    }

    public static void removeFloatingEffect(Match m, FloatingEffect effect) {
        if (m.getFloatingEffects().indexOf(effect) != -1) {
            m.getFloatingEffects().remove(effect);
            effect.leaveGame(m);
        }
    }

    public Map<String, Long> getWinRate(Deck d) {
        return dao.getWinRate(d);
    }

    public Map<String, Long> getWinRate(Player player) {
        return dao.getWinRate(player);
    }

    public List<Match> getRecentMatches(Player player) {
        return dao.getRecentMatches(player);
    }

    public List<Match> getRecentMatches(Deck deck) {
        return dao.getRecentMatches(deck);
    }
}
