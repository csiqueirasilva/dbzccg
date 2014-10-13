/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;

/**
 *
 * @author csiqueira
 */
public class DeclarePhaseEvent extends MatchEvent {

    public DeclarePhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = null;
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        // do the declaration
        if(super.player.getPlayer() instanceof AIPlayer) {
            AIPlayerDLO.declarePhasePlay(m, super.player);
        } else {
            m.setWaitingExternalInteraction(true);
        }
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s Declare Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}