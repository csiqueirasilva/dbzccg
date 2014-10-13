/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.declare;

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
public class DeclarePhase extends Phase {
    public DeclarePhase() {
        super.type = PhaseType.DECLARE;
    } 
    
    @Override
    public String getName() {
        return "DECLARE PHASE";
    }
}
