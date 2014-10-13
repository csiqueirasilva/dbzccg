/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal.defender;

import com.dbzwcg.model.events.turnphase.combat.internal.DecideEndCombatPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class SkipDefenderPhaseEvent extends MatchEvent {

    public SkipDefenderPhaseEvent(MatchPlayer player) {
        super(player);
        super.player = player;
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        DecideEndCombatPhaseEvent aipe = new DecideEndCombatPhaseEvent(phase);
        MatchDLO.applyEvent(m, aipe);
    }

    @Override
    public String logMessage() {
        return "Skip " + super.player.getName() + "'s Defender phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
