/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal;

import com.dbzwcg.model.events.turnphase.combat.EndCombatPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;

/**
 *
 * @author csiqueira
 */
public class DecideEndCombatPhaseEvent extends MatchEvent {
    
    public DecideEndCombatPhaseEvent(CombatPhase phase) {
        super(phase);
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent event;
        CombatPhase phase = (CombatPhase) this.getSourceRawObject();
        if(CombatPhaseDLO.checkCombatPhaseEnd(phase)) {
            event = new EndCombatPhaseEvent(phase);
        } else {
            event = new AddInternalPhaseEvent(phase);
        }
        MatchDLO.applyEvent(m, event);
    }

    @Override
    public String logMessage() {
        return "DECIDING END COMBAT PHASE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
