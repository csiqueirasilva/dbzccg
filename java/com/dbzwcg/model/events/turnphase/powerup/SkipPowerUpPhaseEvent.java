/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.powerup;

import com.dbzwcg.model.events.turnphase.declare.DecideDeclarePhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class SkipPowerUpPhaseEvent extends MatchEvent {

    public SkipPowerUpPhaseEvent(MatchPlayer player) {
        super(player);
        super.player = player;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        DecideDeclarePhaseEvent bdpe = new DecideDeclarePhaseEvent(super.player);
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "SKIP POWER UP PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
