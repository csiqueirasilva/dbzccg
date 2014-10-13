/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.defender;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DecideDefenderPhaseEvent extends MatchEvent {
    
    public DecideDefenderPhaseEvent(CombatPhase phase, MatchPlayer defendingPlayer) {
        super(phase, defendingPlayer);
        super.player = defendingPlayer;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent event;
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        
        if(super.player.getSkipDefenderPhase() || icp.getAttackEvent() == null) {
            event = new SkipDefenderPhaseEvent(super.player);
        } else {
            event = new DefenderPhaseEvent(phase, super.player);
        }
        
        MatchDLO.applyInterruptedEvent(m, event);
    }

    @Override
    public String logMessage() {
        return "DECIDING DEFENDER PHASE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
