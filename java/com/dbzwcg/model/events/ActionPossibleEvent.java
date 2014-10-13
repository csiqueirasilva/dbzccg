/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.log.creator.MatchEventCreator;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.ai.AIPlayer;

/**
 *
 * @author csiqueira
 */
public class ActionPossibleEvent extends MatchEvent {

    ActionPossibleEvent(MatchEventCreator source, MatchEventCreator target, Class chainEvent, MatchPlayer player) {
        super.sourceActor = source;
        super.targetActor = target;
        super.player = player;
        super.nextEvent = chainEvent;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        if(super.player.getPlayer() instanceof AIPlayer) {
            // solve usewhenneed callback for AIPlayer
        } else {
            m.setWaitingExternalInteraction(true);
        }
    }

    @Override
    public String logMessage() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
