/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.physicaltables;

import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@SequenceGenerator(name = PhysicalAttackTable.SEQUENCE_NAME, sequenceName = PhysicalAttackTable.SEQUENCE_NAME, initialValue = 1, allocationSize = 1)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class PhysicalAttackTable implements Serializable {

    public final static String SEQUENCE_NAME = "seq_pat";

    @Id
    @Column
    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
    private Long id;
    
    protected Integer compareNumericalPowerStages(Integer attackingPowerStage, Integer defendingPowerStage) {
        Integer result = this.getDamage(attackingPowerStage) - this.getDamage(defendingPowerStage) + 1;
        return result < 0 ? 0 : result;
    }
    
    protected abstract Integer getDamage(Integer powerStage);
    
    public Integer comparePowerStages (MatchPersonality attacking, MatchPersonality defending) {
        Integer result = 0;
        
        String attackingPowerStage = MatchPersonalityDLO.getCurrentPowerStageValue(attacking);
        String defendingPowerStage = MatchPersonalityDLO.getCurrentPowerStageValue(defending);
        
        try {
            Integer aps = Integer.parseInt(attackingPowerStage);
            Integer dps = Integer.parseInt(attackingPowerStage);
            result = compareNumericalPowerStages(aps, dps);
        } catch (NumberFormatException e) {
            if(attackingPowerStage.equals(SpecialTypesPowerStages.Z.getValue())) {
                result = SpecialTypesPowerStagesCompareValue.Z_ATTACKING.getValue();
            } else if (defendingPowerStage.equals(SpecialTypesPowerStages.Z.getValue())) {
                result = SpecialTypesPowerStagesCompareValue.Z_DEFENDING.getValue();                
            }
        }
        return result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}