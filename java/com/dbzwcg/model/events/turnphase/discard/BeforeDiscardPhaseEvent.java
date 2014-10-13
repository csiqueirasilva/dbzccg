/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.discard;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.discard.DiscardPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeDiscardPhaseEvent extends MatchEvent {
    
    public BeforeDiscardPhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = DiscardPhaseEvent.class;
    }
    
    @Override
    public String logMessage() {
        return "Before " + super.player.getPlayer().getDisplayName() + "'s Discard Phase.";
    }

    @Override
    protected void phaseEffect(Match m) {
        DiscardPhase phase = (DiscardPhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setDiscardPhase(phase);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}