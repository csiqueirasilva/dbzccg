/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turn;

import com.dbzwcg.model.events.turnphase.draw.DecideDrawPhaseEvent;
import com.dbzwcg.model.gamemechanics.turns.StartTurn;
import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;

/**
 *
 * @author csiqueira
 */
public class PlayerStartTurnEvent extends MatchEvent {

    private Turn turn;

    @Override
    public String logMessage() {
        return "Starting " + super.player.getPlayer().getDisplayName() + "'s Turn (#" + this.turn.getTurnNumber() + ").";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected void phaseEffect(Match m) {
        this.turn = MatchDLO.addTurn(m, super.player);
        DecideDrawPhaseEvent bdpe = new DecideDrawPhaseEvent(super.player);
        MatchDLO.applyEvent(m, bdpe);
    }
    
    public PlayerStartTurnEvent(StartTurn gameMechanic, MatchPlayer target) {
        super(gameMechanic, target);
        super.player = target;
        super.nextEvent = null;
    }
}
