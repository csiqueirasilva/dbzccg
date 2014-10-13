/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.draw;

import com.dbzwcg.model.events.noncombat.DecideNonCombatPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class SkipDrawPhaseEvent extends MatchEvent {

    public SkipDrawPhaseEvent(MatchPlayer player) {
        super(player);
        super.player = player;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        DecideNonCombatPhaseEvent bdpe = new DecideNonCombatPhaseEvent(super.player);
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "SKIP DRAW PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
