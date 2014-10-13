/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.noncombat;

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
public class NonCombatPhase extends Phase {
    public NonCombatPhase() {
        super.type = PhaseType.NON$COMBAT;
    } 
    
    @Override
    public String getName() {
        return "NON COMBAT PHASE";
    }
}
