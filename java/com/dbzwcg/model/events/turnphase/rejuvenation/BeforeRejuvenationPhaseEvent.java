/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.rejuvenation;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeRejuvenationPhaseEvent extends MatchEvent {
    
    public BeforeRejuvenationPhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = RejuvenationPhaseEvent.class;
    }

    @Override
    public String logMessage() {
        return "Before " + super.player.getPlayer().getDisplayName() + "'s Rejuvenation Phase.";
    }

    @Override
    protected void phaseEffect(Match m) {
        RejuvenationPhase phase = (RejuvenationPhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setRejuvenationPhase(phase);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}