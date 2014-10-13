/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.rejuvenation;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DecideRejuvenationPhaseEvent extends MatchEvent {
    
    public DecideRejuvenationPhaseEvent(MatchPlayer rejuvenatingPlayer) {
        super(rejuvenatingPlayer);
        super.player = rejuvenatingPlayer;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent bdpe;
        if(super.player.getSkipRejuvenationPhase()) {
            bdpe = new SkipRejuvenationPhaseEvent(super.player);
        } else {
            bdpe = new BeforeRejuvenationPhaseEvent(new RejuvenationPhase(), super.player);
        }
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "Deciding " + super.player.getPlayer().getDisplayName() + "'s Rejuvenation Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
