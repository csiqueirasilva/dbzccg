/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.discard;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.phase.discard.DiscardPhase;
import com.dbzwcg.model.match.phase.discard.DiscardPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DiscardPhaseCycleEvent extends DiscardPhaseEvent {

    public DiscardPhaseCycleEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
    }
    
    @Override
    public void phaseEffect(Match m) {
        DiscardPhase discardPhase = (DiscardPhase) this.getSourceRawObject();
        discardPhase.setCursor(super.player);
        if(DiscardPhaseDLO.checkCycleEndCondition(m, super.player)) {
            DiscardPhaseDLO.cycleDiscardPhase(m);
        } else {
            DiscardPhaseDLO.playerDiscardPhase(m);
        }
    }
}
