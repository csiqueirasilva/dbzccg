/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.damage.modifiers;

import com.dbzwcg.model.match.damage.MatchDamage;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 *
 * @author csiqueira
 */
public class MatchDamageModifierSet extends TreeSet<MatchDamageModifier> implements SortedSet<MatchDamageModifier> {

    public MatchDamageModifierSet() {
        this.maxLifeCardDamage = Integer.MAX_VALUE;
        this.maxPowerStageDamage = Integer.MAX_VALUE;
        this.minPowerStageDamage = 0;
        this.minLifeCardDamage = 0;
    }

    protected Integer maxPowerStageDamage;
    protected Integer minPowerStageDamage;
    protected Integer maxLifeCardDamage;
    protected Integer minLifeCardDamage;

    public Integer getMaxPowerStageDamage() {
        return maxPowerStageDamage;
    }

    public void setMaxPowerStageDamage(Integer maxPowerStageDamage) {
        this.maxPowerStageDamage = maxPowerStageDamage;
    }

    public Integer getMinPowerStageDamage() {
        return minPowerStageDamage;
    }

    public void setMinPowerStageDamage(Integer minPowerStageDamage) {
        this.minPowerStageDamage = minPowerStageDamage;
    }

    public Integer getMaxLifeCardDamage() {
        return maxLifeCardDamage;
    }

    public void setMaxLifeCardDamage(Integer maxLifeCardDamage) {
        this.maxLifeCardDamage = maxLifeCardDamage;
    }

    public Integer getMinLifeCardDamage() {
        return minLifeCardDamage;
    }

    public void setMinLifeCardDamage(Integer minLifeCardDamage) {
        this.minLifeCardDamage = minLifeCardDamage;
    }

    public void applyDamage(MatchDamage damage) {
        Integer lifeCards = damage.getCards();
        Integer powerStages = damage.getStages();

        for (MatchDamageModifier modifier : this) {
            if (lifeCards + modifier.modifier.getCards() > this.maxLifeCardDamage) {
                lifeCards = this.maxLifeCardDamage;
            } else if (lifeCards + modifier.modifier.getCards() < this.minLifeCardDamage) {
                lifeCards = this.minLifeCardDamage;
            } else {
                lifeCards += modifier.modifier.getCards();
            }

            if (powerStages + modifier.modifier.getStages() > this.maxPowerStageDamage) {
                powerStages = this.maxPowerStageDamage;
            } else if (lifeCards + modifier.modifier.getStages() < this.minPowerStageDamage) {
                powerStages = this.minPowerStageDamage;
            } else {
                powerStages += modifier.modifier.getStages();
            }
        }

        damage.setCards(lifeCards);
        damage.setStages(powerStages);
    }

    final private static Comparator<? super MatchDamageModifier> comparator = new Comparator<MatchDamageModifier>() {
        @Override
        public int compare(MatchDamageModifier o1, MatchDamageModifier o2) {
            return o1.priority - o2.priority;
        }
    };

    @Override
    public Comparator<? super MatchDamageModifier> comparator() {
        return MatchDamageModifierSet.comparator;
    }
}
