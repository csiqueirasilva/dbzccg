/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.attacker;

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
public class PassAttackerPhaseCombatPhaseEvent extends MatchEvent {

    public PassAttackerPhaseCombatPhaseEvent(MatchPlayer generator) {
        super(generator);
    }

    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase lastInternalPhase = CombatPhaseDLO.getLastInternalPhase(phase);
        lastInternalPhase.setAttackerPhasePassed(true);
        m.setWaitingExternalInteraction(false);
    }

    @Override
    public String logMessage() {
        return "PASS ATTACKER PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}