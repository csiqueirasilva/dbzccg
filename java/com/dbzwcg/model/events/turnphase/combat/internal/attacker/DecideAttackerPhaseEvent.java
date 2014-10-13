/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.attacker;

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
public class DecideAttackerPhaseEvent extends MatchEvent {
    
    public DecideAttackerPhaseEvent(CombatPhase phase, MatchPlayer attackingPlayer) {
        super(phase, attackingPlayer);
        super.player = attackingPlayer;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent event;
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase());
        if(super.player.getSkipAttackerPhase()) {
            icp.setSkipped(true);
            event = new SkipAttackerPhaseEvent(super.player);
        } else {
            icp.setSkipped(false);
            event = new AttackerPhaseEvent((CombatPhase) this.getSourceRawObject(), super.player);
        }
        MatchDLO.applyInterruptedEvent(m, event);
    }

    @Override
    public String logMessage() {
        return "DECIDING ATTACKER PHASE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
