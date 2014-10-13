/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class MainPersonalityLevelChangeEvent extends MatchEvent {

    public MainPersonalityLevelChangeEvent(GameMechanic generator, MatchPlayer player, Integer levelChange) {
        super(generator, player);
        super.player = player;
        super.displayableToUser = true;
        this.levelChange = levelChange;
    }
    
    private Integer levelChange;

    public Integer getLevelChange() {
        return levelChange;
    }

    public void setLevelChange(Integer levelChange) {
        this.levelChange = levelChange;
    }

    @Override
    protected void phaseEffect(Match m) {
        MatchPersonality personality = super.player.getMainPersonality();

        if(this.levelChange > 0 && MatchPersonalityDLO.advanceLevel(personality)) {
            // discard all drills on level up event
        } else {
            MatchPersonalityDLO.retreatLevel(personality);
        }
    }

    @Override
    public String logMessage() {
        String method = this.levelChange < 0 ? "retreated" : "advanced";
        return super.player.getPlayer().getDisplayName() + "'s main personality " + method + " " + Math.abs(this.levelChange) + " level(s).";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
