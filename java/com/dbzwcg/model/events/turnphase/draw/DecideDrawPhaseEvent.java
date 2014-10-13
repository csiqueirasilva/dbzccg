/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.draw;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.draw.DrawPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DecideDrawPhaseEvent extends MatchEvent {

    public DecideDrawPhaseEvent(MatchPlayer player) {
        super(player);
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent event;
        
        if(super.player.getSkipDrawPhase()) {
            event = new SkipDrawPhaseEvent(super.player);
        } else {
            event = new BeforeDrawPhaseEvent(new DrawPhase(), super.player);
        }

        MatchDLO.applyEvent(m, event);
    }

    @Override
    public String logMessage() {
        return "Deciding " + super.player.getPlayer().getDisplayName() + "'s Draw Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
