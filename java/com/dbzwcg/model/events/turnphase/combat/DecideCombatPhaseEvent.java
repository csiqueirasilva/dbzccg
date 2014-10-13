/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DecideCombatPhaseEvent extends MatchEvent {
    
    private MatchPlayer declaredPlayer;
    
    public DecideCombatPhaseEvent(MatchPlayer player, MatchPlayer declaredPlayer) {
        super(player, declaredPlayer);
        super.player = player;
        this.declaredPlayer = declaredPlayer;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchEvent bdpe;
        if(super.player.getSkipCombatPhase()) {
            bdpe = new SkipCombatPhaseEvent(player);
        } else {
            CombatPhase phase = CombatPhaseDLO.createCombatPhase(super.player, this.declaredPlayer);
            bdpe = new BeforeCombatPhaseEvent(phase, super.player);
        }
        MatchDLO.applyEvent(m, bdpe);
    }

    @Override
    public String logMessage() {
        return "DECIDING COMBAT PHASE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
