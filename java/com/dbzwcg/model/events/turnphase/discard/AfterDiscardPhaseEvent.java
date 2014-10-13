/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.discard;

import com.dbzwcg.model.events.turn.PlayerFinishTurnEvent;
import com.dbzwcg.model.events.turnphase.rejuvenation.BeforeRejuvenationPhaseEvent;
import com.dbzwcg.model.events.turnphase.rejuvenation.DecideRejuvenationPhaseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.turns.EndTurn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AfterDiscardPhaseEvent extends MatchEvent {
    
    public AfterDiscardPhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent bdpe;
        
        if(MatchDLO.getLastTurn(m).getCombatPhase() == null) {
            bdpe = new DecideRejuvenationPhaseEvent(super.player);
        } else {
            bdpe = new PlayerFinishTurnEvent(new EndTurn(), super.player);
        }
        
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "After " + super.player.getPlayer().getDisplayName() + "'s Discard Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}