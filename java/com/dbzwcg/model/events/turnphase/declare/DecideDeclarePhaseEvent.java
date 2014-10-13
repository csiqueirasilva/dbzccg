/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.declare.DeclarePhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DecideDeclarePhaseEvent extends MatchEvent {

    public DecideDeclarePhaseEvent(MatchPlayer declaringPlayer) {
        super(declaringPlayer);
        super.player = declaringPlayer;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent bdpe;
        if(super.player.getSkipDeclarePhase()) {
            bdpe = new SkipDeclarePhaseEvent(super.player);
        } else {
            bdpe = new BeforeDeclarePhaseEvent(new DeclarePhase(), super.player);
        }
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "Deciding " + super.player.getPlayer().getDisplayName() + "'s Declare Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
