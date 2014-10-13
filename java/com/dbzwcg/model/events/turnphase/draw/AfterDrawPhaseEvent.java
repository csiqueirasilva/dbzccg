package com.dbzwcg.model.events.turnphase.draw;

import com.dbzwcg.model.events.noncombat.DecideNonCombatPhaseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AfterDrawPhaseEvent extends MatchEvent {

    @Override
    public String logMessage() {
        return "After " + super.player.getPlayer().getDisplayName() + "'s Draw Phase.";
    }

    public AfterDrawPhaseEvent(GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = null;
    }

    @Override
    protected void phaseEffect(Match m) {
        DecideNonCombatPhaseEvent bdpe = new DecideNonCombatPhaseEvent(super.player);
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}