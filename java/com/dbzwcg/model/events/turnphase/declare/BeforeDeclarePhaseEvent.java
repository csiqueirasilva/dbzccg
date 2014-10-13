/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.declare.DeclarePhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeDeclarePhaseEvent extends MatchEvent {

    public BeforeDeclarePhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = DeclarePhaseEvent.class;
    }

    @Override
    public String logMessage() {
        return "Before " + super.player.getPlayer().getDisplayName() + "'s Declare Phase.";
    }

    @Override
    protected void phaseEffect(Match m) {
        DeclarePhase phase = (DeclarePhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setDeclarePhase(phase);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
