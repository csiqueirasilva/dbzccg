/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.events.turnphase.combat.DecideCombatPhaseEvent;
import com.dbzwcg.model.events.turnphase.discard.BeforeDiscardPhaseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AfterDeclarePhaseEvent extends MatchEvent {

    private MatchPlayer declaredPlayer;
    
    public AfterDeclarePhaseEvent (GameMechanic generator, MatchPlayer target, MatchPlayer declaredPlayer) {
        this(generator, target);
        this.declaredPlayer = declaredPlayer;
    }
    
    public AfterDeclarePhaseEvent (GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
        super.nextEvent = null;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent bdpe; 
        Turn turn = MatchDLO.getLastTurn(m);
        if(this.declaredPlayer == null) {
            bdpe = new BeforeDiscardPhaseEvent(turn.getDiscardPhase(), super.player);
        } else {
            bdpe = new DecideCombatPhaseEvent(super.player, this.declaredPlayer);
        }
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "After " + super.player.getPlayer().getDisplayName() + "'s Declare Phase";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}