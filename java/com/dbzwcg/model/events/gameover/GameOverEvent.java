/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.gameover;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.GameOver;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
abstract class GameOverEvent extends MatchEvent {

    public GameOverEvent(GameOver generator, MatchPlayer player) {
        super(generator, player);
        super.player = player;
    }

    protected abstract Boolean runSpecificMatchEnd(Match m);
    
    @Override
    public void phaseEffect(Match m) {
        super.player.setLoser(true);
        this.runSpecificMatchEnd(m);
    }
}
