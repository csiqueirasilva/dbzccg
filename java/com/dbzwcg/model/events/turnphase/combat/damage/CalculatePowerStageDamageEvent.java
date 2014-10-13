/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.damage;

import com.dbzwcg.model.events.powerstages.PowerStageDamageEvent;
import com.dbzwcg.model.events.turnphase.combat.damage.lifecard.DropLifeCardDamageEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class CalculatePowerStageDamageEvent extends MatchEvent {

    protected MatchDamage sourceDamage;
    protected MatchDamage damageCounter;
    protected Integer powerStageDamage;

    public MatchDamage getSourceDamage() {
        return sourceDamage;
    }

    public void setSourceDamage(MatchDamage sourceDamage) {
        this.sourceDamage = sourceDamage;
    }

    public MatchDamage getDamageCounter() {
        return damageCounter;
    }

    public void setDamageCounter(MatchDamage damageCounter) {
        this.damageCounter = damageCounter;
    }

    public CalculatePowerStageDamageEvent(GenericCardEffect effect, MatchPlayer player, MatchDamage sourceDamage, MatchDamage damageCounter) {
        super(effect, player);
        this.damageCounter = damageCounter;
        this.sourceDamage = sourceDamage;
        super.player = player;
    }

    @Override
    protected void phaseEffect(Match m) {
        MatchPersonality p = super.player.getPersonalityInControl();
        Integer powerStageLevel = p.getCurrentPowerStageAboveZero();
        Integer lifeCardDamage = this.sourceDamage.getCards();

        if (powerStageLevel - this.sourceDamage.getStages() < 0) {
            Integer addedLifeCardDamage = -(powerStageLevel - this.sourceDamage.getStages());
            this.powerStageDamage = powerStageLevel;
            lifeCardDamage += addedLifeCardDamage;
        } else {
            this.powerStageDamage = this.sourceDamage.getStages();
        }

        Integer newPowerStageLevel = powerStageLevel - this.powerStageDamage;
        p.setCurrentPowerStageAboveZero(newPowerStageLevel);

        if (this.powerStageDamage > 0) {
            this.damageCounter.setStages(this.powerStageDamage);
            PowerStageDamageEvent psde = new PowerStageDamageEvent((GameMechanic) this.getSourceRawObject(), p, this.player, this.powerStageDamage);
            MatchDLO.applyInterruptedEvent(m, psde);
        } 
        
        if (lifeCardDamage > 0) {
            DropLifeCardDamageEvent dlce = DropLifeCardDamageEvent.createDropLifeCardDamageEvent(lifeCardDamage, (GenericCardEffect) this.getSourceRawObject(),
                    super.player,
                    this.sourceDamage,
                    this.damageCounter);
            
            MatchDLO.applyInterruptedEvent(m, dlce);
        }
    }

    @Override
    public String logMessage() {
        return "CALCULATE POWER STAGE DAMAGE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
