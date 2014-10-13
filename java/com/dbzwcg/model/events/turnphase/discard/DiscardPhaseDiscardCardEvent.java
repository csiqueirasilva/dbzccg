/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.discard;

import com.dbzwcg.model.events.cardmove.DiscardCardEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.phase.discard.DiscardPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DiscardPhaseDiscardCardEvent extends DiscardCardEvent {

    public DiscardPhaseDiscardCardEvent(GameMechanic gameMechanic, MatchPlayer player, MoveCardMechanic mcm) {
        super(gameMechanic, player, mcm);
    }

    @Override
    public void phaseEffect(Match m) {
        super.phaseEffect(m);
        if (DiscardPhaseDLO.checkCycleEndCondition(m, super.player)) {
            DiscardPhaseDLO.cycleDiscardPhase(m);
        } else {
            DiscardPhaseDLO.playerDiscardPhase(m);
        }
    }
}
