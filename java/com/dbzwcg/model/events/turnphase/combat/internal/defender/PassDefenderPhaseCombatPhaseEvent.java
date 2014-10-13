/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.defender;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class PassDefenderPhaseCombatPhaseEvent extends MatchEvent {

    public PassDefenderPhaseCombatPhaseEvent(MatchPlayer generator) {
        super(generator);
    }

    @Override
    protected void phaseEffect(Match m) {
        m.setWaitingExternalInteraction(false);
        
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        
        AttackEvent ae = icp.getAttackEvent();
        ae.incrementTentativeDefenses(m);
    }

    @Override
    public String logMessage() {
        return "PASS DEFENDER PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}