/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AngerChangeEvent extends MatchEvent {
    private Integer angerChange;
    private Boolean setAnger;

    public Integer getAngerChange() {
        return angerChange;
    }

    public void setAngerChange(Integer angerChange) {
        this.angerChange = angerChange;
    }

    public Boolean getSetAnger() {
        return setAnger;
    }

    public void setSetAnger(Boolean setAnger) {
        this.setAnger = setAnger;
    }

    public AngerChangeEvent(GameMechanic generator, MatchPlayer player, Integer angerChange, Boolean setAnger) {
        super(generator, player);
        super.player = player;
        this.angerChange = angerChange;
        this.setAnger = setAnger;
        super.displayableToUser = true;
    }

    @Override
    public String logMessage() {
        String action;
        
        if(this.setAnger) {
            action = "set to";
        } else if (this.angerChange > 0) {
            action = "raised by";
        } else {
            action = "lowered by";
        }
        
        action += " " + Math.abs(this.angerChange);
        
        return super.player.getPlayer().getDisplayName() + "'s had his/her anger level " + action + 
                " due to the effects of " + ((GameMechanic) super.getSourceRawObject()).getName() + ".";
    }

    @Override
    protected void phaseEffect(Match m) {
        if(!this.setAnger) {
            Integer anger = super.player.getMainPersonality().getCurrentAngerLevel();
            
            if((anger + this.angerChange) < 0) {
                anger = 0;
            } else if ((anger + this.angerChange) > super.player.getMainPersonality().getAngerLevelNeededToLevel()) {
                anger = super.player.getMainPersonality().getAngerLevelNeededToLevel();
            } else {
                anger += this.angerChange;
            }
            
            super.player.getMainPersonality().setCurrentAngerLevel(anger);
        } else {
            super.player.getMainPersonality().setCurrentAngerLevel(this.angerChange);
        }
        
        if(super.player.getMainPersonality().getAngerLevelNeededToLevel().equals(super.player.getMainPersonality().getCurrentAngerLevel())) {
            MainPersonalityLevelChangeEvent mplce = new MainPersonalityLevelChangeEvent((GameMechanic) this.getSourceRawObject(), super.player, this.angerChange);
            MatchDLO.applyInterruptedEvent(m, mplce);
        }
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
