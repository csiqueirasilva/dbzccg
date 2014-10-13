/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.noncombat;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;

/**
 *
 * @author csiqueira
 */
public class NonCombatPhaseEvent extends MatchEvent {

    public NonCombatPhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = null;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        if(super.player.getPlayer() instanceof AIPlayer) {
            AIPlayerDLO.nonCombatPhasePlay(m, super.player);
        } else {
            m.setWaitingExternalInteraction(true);
        }
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s Non-Combat Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
