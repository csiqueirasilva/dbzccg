/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.personality;

import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */

@Entity
@SequenceGenerator(name = MatchPersonality.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public class MatchPersonality implements Serializable {
    
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = MatchPersonality.SEQUENCE_NAME)
    @Id
    @Column
    private Integer id;

    public final static String SEQUENCE_NAME = "seq_match_personality";

    @Column
    protected Integer currentPersonalityLevel;
    @Column
    protected Integer currentPowerStageAboveZero;
    
    @JoinColumn
    @OneToOne( optional = false)
    protected MatchCardGroup personalities;
    
    @Column
    protected Integer powerUpRatingModifier;
    
    @Column
    protected Boolean canPerformEnergyAttacks;
    
    @Column
    protected Boolean canPerformPhysicalAttacks;

    public Boolean getCanPerformEnergyAttacks() {
        return canPerformEnergyAttacks;
    }

    public void setCanPerformEnergyAttacks(Boolean canPerformEnergyAttacks) {
        this.canPerformEnergyAttacks = canPerformEnergyAttacks;
    }

    public Boolean getCanPerformPhysicalAttacks() {
        return canPerformPhysicalAttacks;
    }

    public void setCanPerformPhysicalAttacks(Boolean canPerformPhysicalAttacks) {
        this.canPerformPhysicalAttacks = canPerformPhysicalAttacks;
    }

    public Integer getPowerUpRatingModifier() {
        return powerUpRatingModifier;
    }

    public void setPowerUpRatingModifier(Integer powerUpRatingModifier) {
        this.powerUpRatingModifier = powerUpRatingModifier;
    }

    public MatchCardGroup getPersonalities() {
        return personalities;
    }

    public void setPersonalities(MatchCardGroup personalities) {
        this.personalities = personalities;
    }

    public Integer getCurrentPersonalityLevel() {
        return currentPersonalityLevel;
    }

    public void setCurrentPersonalityLevel(Integer currentMainPersonalityLevel) {
        this.currentPersonalityLevel = currentMainPersonalityLevel;
    }

    public Integer getCurrentPowerStageAboveZero() {
        return currentPowerStageAboveZero;
    }

    public void setCurrentPowerStageAboveZero(Integer currentPowerStageAboveZero) {
        this.currentPowerStageAboveZero = currentPowerStageAboveZero;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
