/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal;

import com.dbzwcg.model.events.turnphase.combat.internal.attacker.DecideAttackerPhaseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.defender.DecideDefenderPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;

/**
 *
 * @author csiqueira
 */
public class AddInternalPhaseEvent extends MatchEvent {
    public AddInternalPhaseEvent(CombatPhase gameMechanic) {
        super(gameMechanic);
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) this.getSourceRawObject();
        CombatPhaseDLO.addInternalPhase(m, phase);
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        DecideAttackerPhaseEvent ape = new DecideAttackerPhaseEvent(phase, icp.getAttackingPlayer());
        MatchDLO.applyEvent(m, ape);
        DecideDefenderPhaseEvent dpe = new DecideDefenderPhaseEvent(phase, icp.getDefendingPlayer());
        MatchDLO.applyEvent(m, dpe);
    }

    @Override
    public String logMessage() {
        return "ADD INTERNAL COMBAT PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }    
}
