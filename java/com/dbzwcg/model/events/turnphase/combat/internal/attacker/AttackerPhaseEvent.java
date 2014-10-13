/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.attacker;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;

/**
 *
 * @author csiqueira
 */
public class AttackerPhaseEvent extends MatchEvent {

    public AttackerPhaseEvent(CombatPhase phase, MatchPlayer attackingPlayer) {
        super(phase, attackingPlayer);
        super.player = attackingPlayer;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        if (super.player.getPlayer() instanceof AIPlayer) {
            AIPlayerDLO.combatAttackerPhasePlay(m, super.player);
        } else {
            m.setWaitingExternalInteraction(true);
        }
    }

    @Override
    public String logMessage() {
        return super.player.getName() + "'s Attacker Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
