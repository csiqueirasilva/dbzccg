/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.gameover;

import com.dbzwcg.model.gamemechanics.GameOver;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class LifeCardGameOverEvent extends GameOverEvent {

    public LifeCardGameOverEvent(GameOver gameOver, MatchPlayer p) {
        super(gameOver, p);
    }
    
    @Override
    public String logMessage() {
        return "LIFE CARD GAME OVER EVENT - LOSER: " + super.player.getPlayer().getDisplayName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected Boolean runSpecificMatchEnd(Match m) {
        Boolean ret = true;
        // check if there is only one player "standing"
        MatchPlayer lastStandingPlayer = null;
        Integer countStandingPlayer = 0;
        
        for(int i = 0; i < m.getPlayers().size(); i++) {
            MatchPlayer p = m.getPlayers().get(i);
            if(!p.getLoser()) {
                lastStandingPlayer = p;
                countStandingPlayer++;
            }
        }
        
        if(countStandingPlayer > 1) {
            ret = false;
        } else {
            MatchDLO.setMatchWinner(m, lastStandingPlayer);
        }
        
        return ret;
    }
}