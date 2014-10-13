/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.gameover;

import com.dbzwcg.model.gamemechanics.GameOver;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;

/**
 *
 * @author csiqueira
 */
public class GameOverVictoryEvent extends MatchEvent {

    public GameOverVictoryEvent(GameOver gameOver, MatchPlayer p) {
        super(gameOver, p);
        super.player = p;
    }

    @Override
    public String logMessage() {
        return "MATCH FINISHED - " + super.player.getPlayer().getDisplayName() + " WINS";
    }

    @Override
    public void resolveEffect(Match m) {
        // clean up?
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected void phaseEffect(Match m) {
        m.setTerminated(true);
    }
}