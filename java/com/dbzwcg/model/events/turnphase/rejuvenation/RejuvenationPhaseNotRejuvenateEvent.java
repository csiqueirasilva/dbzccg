/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.rejuvenation;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class RejuvenationPhaseNotRejuvenateEvent extends MatchEvent {

    public RejuvenationPhaseNotRejuvenateEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = AfterRejuvenationPhaseEvent.class;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        ((RejuvenationPhase) m.getCurrentPhase()).setRejuvenated(false);
        m.setWaitingExternalInteraction(false);
    }

    @Override
    public String logMessage() {
        return "NOT REJUVENATING EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
