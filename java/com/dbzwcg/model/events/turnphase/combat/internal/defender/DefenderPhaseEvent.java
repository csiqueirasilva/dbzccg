/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.defender;

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
public class DefenderPhaseEvent extends MatchEvent {
    
    public DefenderPhaseEvent(CombatPhase phase, MatchPlayer defendingPlayer) {
        super(phase, defendingPlayer);
        super.player = defendingPlayer;
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        if(super.player.getPlayer() instanceof AIPlayer) {
            AIPlayerDLO.combatDefenderPhasePlay(m, super.player);
        } else {
            m.setWaitingExternalInteraction(true);
        }
    }

    @Override
    public String logMessage() {
        return super.player.getName() + "'s Defender Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
