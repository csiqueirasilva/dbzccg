/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.draw;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.draw.DrawPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeDrawPhaseEvent extends MatchEvent {

    @Override
    public String logMessage() {
        return "Before " + super.player.getPlayer().getDisplayName() + "'s Draw Phase.";
    }

    public BeforeDrawPhaseEvent(GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = DrawPhaseEvent.class;
    }

    @Override
    protected void phaseEffect(Match m) {
        DrawPhase phase = (DrawPhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setDrawPhase(phase);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}