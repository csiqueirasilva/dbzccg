/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.gamemechanics.turns.TurnDLO;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;

/**
 *
 * @author csiqueira
 */
public class EndCombatPhaseEvent extends MatchEvent {

    public EndCombatPhaseEvent(CombatPhase phase) {
        super(phase);
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        AfterCombatPhaseEvent acpe = new AfterCombatPhaseEvent(phase, TurnDLO.getCurrentTurn(m).getOwner());
        MatchDLO.applyEvent(m, acpe);
    }

    @Override
    public String logMessage() {
        return "END COMBAT PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
