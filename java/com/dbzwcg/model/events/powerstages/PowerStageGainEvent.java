/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.powerstages;

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
public class PowerStageGainEvent extends MatchEvent {

    protected Integer powerStageChange;
    protected MatchPersonality personality;

    public Integer getPowerStageChange() {
        return powerStageChange;
    }

    public void setPowerStageChange(Integer powerStageChange) {
        this.powerStageChange = powerStageChange;
    }

    public MatchPersonality getPersonality() {
        return personality;
    }

    public void setPersonality(MatchPersonality personality) {
        this.personality = personality;
    }

    public PowerStageGainEvent(GameMechanic gameMechanic, MatchPersonality personality, MatchPlayer player, Integer powerStageGain) {
        super(gameMechanic, MatchPersonalityDLO.getCurrentPersonality(personality));
        super.player = player;
        super.nextEvent = null;
        this.powerStageChange = powerStageGain;
        this.personality = personality;
        super.displayableToUser = true;
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s personality " + MatchPersonalityDLO.getCurrentPersonality(this.personality).getSourceCard().getName()
                + " gained " + this.powerStageChange + " power stage(s).";
    }

    @Override
    protected void phaseEffect(Match m) {
        MatchPersonalityDLO.gainPowerStage(this.personality, this.powerStageChange);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
