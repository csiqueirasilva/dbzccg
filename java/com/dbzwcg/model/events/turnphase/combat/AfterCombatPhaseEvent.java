/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.events.turnphase.discard.BeforeDiscardPhaseEvent;
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
public class AfterCombatPhaseEvent extends MatchEvent {
    
    public AfterCombatPhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = null;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        BeforeDiscardPhaseEvent bdpe = new BeforeDiscardPhaseEvent(new DiscardPhase(), super.player);
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "AFTER COMBAT PHASE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}