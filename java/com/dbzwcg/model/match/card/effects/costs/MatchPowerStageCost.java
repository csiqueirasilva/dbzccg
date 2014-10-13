/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.costs;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class MatchPowerStageCost extends MatchCost {
    
    private final Integer cost;
    
    MatchPowerStageCost(Integer cost) {
        this.cost = cost;
    }
    
    @Override
    public Boolean checkCost(Match m, MatchPlayer p) {
        MatchPersonality personality = p.getPersonalityInControl();
        return personality.getCurrentPowerStageAboveZero() >= cost;
    }

    @Override
    public void payCost(Match m, MatchPlayer p) {
        MatchPersonality personality = p.getPersonalityInControl();
        Integer finalPowerStage = personality.getCurrentPowerStageAboveZero() - this.cost;        
        personality.setCurrentPowerStageAboveZero(finalPowerStage);
    }
}