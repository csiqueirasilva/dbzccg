/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.players.ai;

import com.dbzwcg.model.events.turnphase.discard.DiscardPhaseDiscardCardEvent;
import com.dbzwcg.model.events.turnphase.rejuvenation.RejuvenationPhaseRejuvenateEvent;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffectDLO;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.players.MatchPlayerDLO;
import com.dbzwcg.model.players.Player;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class AIPlayerDLO {

    public static String AI_USER_EMAIL = "ai@dbzwcg.com";
    
    public static AIPlayer createFromPlayer(Player p) {
        AIPlayer aiPlayer = new AIPlayer();

        aiPlayer.setDisplayName(p.getDisplayName());
        aiPlayer.setEmail(p.getEmail());
        aiPlayer.setEnable(p.getEnable());
        aiPlayer.setId(p.getId());
        aiPlayer.setPassword(p.getPassword());
        aiPlayer.setPoints(p.getPoints());
        aiPlayer.setRoles(p.getRoles());

        return aiPlayer;
    }

    public static void discardPhasePlay(Match m, MatchPlayer p) {
        Integer cardIndex = (int) ((p.getHand().size() - 1) * Math.random());
        MatchCard discartedCard = p.getHand().get(cardIndex);
        MoveCardMechanic mcm = new MoveCardMechanic(discartedCard, 
                p.getDiscardPile(), p.getHand());
        DiscardPhaseDiscardCardEvent dpdce = 
                new DiscardPhaseDiscardCardEvent(m.getCurrentPhase(), p, mcm);
        MatchDLO.applyEvent(m, dpdce);
    }

    public static void rejuvenationPhasePlay(Match m, MatchPlayer p) {
        RejuvenationPhase phase = (RejuvenationPhase) m.getCurrentPhase();
        RejuvenationPhaseRejuvenateEvent rpre = new RejuvenationPhaseRejuvenateEvent(phase, p);
        MatchDLO.applyEvent(m, rpre);
    }

    public static void useWhenNeededPlay(Match m, MatchPlayer p) {
    }

    public static void defenderDefendsPlay(Match m, MatchPlayer p) {

    }

    public static void attackerAttacksPlay(Match m, MatchPlayer p, MatchCard card, MatchCardGroup source) {
        GenericCardEffectDLO.putCardInPlay(card.getEffect(), m, p, source);
        CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase()).setAttackerPhasePassed(false);
    }

    public static void declarePhasePlay(Match m, MatchPlayer p) {
        //MatchPlayerDLO.declarePhaseSkipCombat(m, p);
        MatchPlayerDLO.declarePhaseDeclareCombat(m, p);
    }

    public static void nonCombatPhasePlay(Match m, MatchPlayer p) {
        MatchPlayerDLO.endNonCombatPhase(m, p);
    }

    public static void combatAttackerPhasePlay(Match m, MatchPlayer p) {
        if (p.getHand().size() > 0 && p.getHand().get(0).getEffect().playable(m, p)) {
            attackerAttacksPlay(m, p, p.getHand().get(0), p.getHand());
        } else {
            MatchPlayerDLO.passInternalCombatPhase(m, p);
        }
    }

    public static void defenderDefendsPlay(Match m, MatchPlayer p, MatchCard card, MatchCardGroup source) {
        GenericCardEffectDLO.putCardInPlay(card.getEffect(), m, p, source);
        CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase()).setDefenderPhasePassed(false);
    }

    public static void combatDefenderPhasePlay(Match m, MatchPlayer p) {
        if (p.getHand().size() > 0 && p.getHand().get(0).getEffect().playable(m, p)) {
            defenderDefendsPlay(m, p, p.getHand().get(0), p.getHand());
        } else {
            MatchPlayerDLO.passInternalCombatPhase(m, p);
        }
    }
}
