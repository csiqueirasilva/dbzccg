/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.turns;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class TurnDLO {
    public static Turn createTurn(Integer turnNumber, MatchPlayer owner) {
        Turn turn = new Turn();
        turn.setTurnNumber(turnNumber);
        turn.setOwner(owner);
        return turn;
    }
    
    public static Turn getCurrentTurn(Match m) {
        return m.getTurns().get(m.getTurns().size() - 1);
    }
}