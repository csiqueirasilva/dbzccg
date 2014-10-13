/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.powerup;

import com.dbzwcg.model.events.turnphase.declare.DecideDeclarePhaseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AfterPowerUpPhaseEvent extends MatchEvent {

    public AfterPowerUpPhaseEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = null;
    }

    @Override
    public String logMessage() {
        return "After " + super.player.getPlayer().getDisplayName() + "'s Power Up Phase.";
    }

    @Override
    protected void phaseEffect(Match m) {
        DecideDeclarePhaseEvent bdpe = new DecideDeclarePhaseEvent(super.player);
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}