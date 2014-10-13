/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.pur;

import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.types.PhaseType;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@PrimaryKeyJoinColumn
@Entity
@Table
public class PowerUpPhase extends Phase {
    public PowerUpPhase() {
        super.type = PhaseType.POWER_UP;
    } 
    
    @Override
    public String getName() {
        return "POWER UP RATING PHASE";
    }
}
