/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.discard.DiscardPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DeclarePhaseNotDeclareEvent extends MatchEvent {

    public DeclarePhaseNotDeclareEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = AfterDeclarePhaseEvent.class;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        Turn lastTurn = MatchDLO.getLastTurn(m);
        lastTurn.setDiscardPhase(new DiscardPhase());
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + " did not declared combat.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
