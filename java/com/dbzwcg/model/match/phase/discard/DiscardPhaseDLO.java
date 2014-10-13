/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.discard;

import com.dbzwcg.model.events.turnphase.discard.AfterDiscardPhaseEvent;
import com.dbzwcg.model.events.turnphase.discard.DiscardPhaseCycleEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;

/**
 *
 * @author csiqueira
 */
public class DiscardPhaseDLO {

    public static Boolean checkCycleEndCondition(Match m, MatchPlayer player) {
        Boolean ret = true;
        if (player.getHand().size() > player.getDiscardPhaseHandSize()) {
            ret = false;
        }
        return ret;
    }

    public static void playerDiscardPhase(Match m) {
        DiscardPhase phase = (DiscardPhase) m.getCurrentPhase();
        MatchPlayer player = phase.getCursor();
        if (player.getSkipDiscardPhase() || DiscardPhaseDLO.checkCycleEndCondition(m, player)) {
            DiscardPhaseDLO.cycleDiscardPhase(m);
        } else {
            if (player.getPlayer() instanceof AIPlayer) {
                AIPlayerDLO.discardPhasePlay(m, player);
            } else {
                m.setWaitingExternalInteraction(true);
            }
        }
    }

    public static void playerDiscardPhaseAction() {
        // external action
    }

    public static void cycleDiscardPhase(Match m) {
        DiscardPhase phase = (DiscardPhase) m.getCurrentPhase();
        MatchPlayer owner = phase.getOwner();
        Integer nextIndex = (phase.getPlayers().indexOf(phase.getCursor()) + 1) % phase.getPlayers().size();
        if(phase.getPlayers().indexOf(owner) == nextIndex) {
            AfterDiscardPhaseEvent adpe = new AfterDiscardPhaseEvent(phase, owner);
            MatchDLO.applyEvent(m, adpe);
        } else {
            MatchPlayer newCursor = phase.getPlayers().get(nextIndex);
            DiscardPhaseCycleEvent dpce = new DiscardPhaseCycleEvent(phase, newCursor);
            MatchDLO.applyEvent(m, dpce);
        }
    }
}