/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DefenderCombatDrawEvent extends MatchEvent {

    public DefenderCombatDrawEvent(CombatPhase generator, MatchPlayer player) {
        super(generator);
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        MatchCardGroupDLO.topDrawEventFromMatchCardGroup(phase, m, super.player.getLifeDeck(), super.player, super.player.getCombatPhaseDefenderDraw());
    }

    @Override
    public String logMessage() {
        return "COMBAT DEFENDER DRAW EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
