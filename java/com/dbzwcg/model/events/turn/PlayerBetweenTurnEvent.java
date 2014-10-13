/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turn;

import com.dbzwcg.model.gamemechanics.turns.StartTurn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class PlayerBetweenTurnEvent extends MatchEvent {

    PlayerBetweenTurnEvent(MatchPlayer player, MatchPlayer nextPlayer) {
        super(player, nextPlayer);
        super.player = nextPlayer;
    }

    @Override
    protected void phaseEffect(Match m) {
        PlayerStartTurnEvent pste = new PlayerStartTurnEvent(new StartTurn(), super.player);
        MatchDLO.applyEvent(m, pste);
    }

    @Override
    public String logMessage() {
        return "Between player's turns.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
