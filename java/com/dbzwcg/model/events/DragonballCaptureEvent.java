/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;

/**
 *
 * @author csiqueira
 */
public class DragonballCaptureEvent extends MatchEvent {
    private MatchPlayer capturingPlayer;
    private MatchPlayer targetPlayer;
    private MatchCard targetDragonball;

    @Override
    public String logMessage() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected void phaseEffect(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}