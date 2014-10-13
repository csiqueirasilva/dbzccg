/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.powerup;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.pur.PowerUpPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforePowerUpPhaseEvent extends MatchEvent {

    public BeforePowerUpPhaseEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = PowerUpPhaseEvent.class;
    }

    @Override
    public String logMessage() {
        return "Before " + super.player.getPlayer().getDisplayName() + "'s Power Up Phase.";
    }

    @Override
    protected void phaseEffect(Match m) {
        PowerUpPhase phase = (PowerUpPhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setPowerUpPhase(phase);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}