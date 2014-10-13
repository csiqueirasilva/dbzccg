/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.events.powerstages;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class PowerStageDamageEvent extends PowerStageLoseEvent {
    
    public PowerStageDamageEvent(GameMechanic gameMechanic, MatchPersonality personality, MatchPlayer player, Integer powerStageLost) {
        super(gameMechanic, personality, player, powerStageLost);
    }
    
    @Override
    public String logMessage() {
        return "POWER STAGE DAMAGE - (" + super.getPowerStageChange() + ")";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
