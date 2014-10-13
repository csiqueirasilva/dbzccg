/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.rejuvenation;

import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.types.PhaseType;
import javax.persistence.Column;
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
public class RejuvenationPhase extends Phase {

    @Column
    private Boolean rejuvenated;

    public RejuvenationPhase() {
        super.type = PhaseType.REJUVENATION;
    }

    public Boolean getRejuvenated() {
        return rejuvenated;
    }

    public void setRejuvenated(Boolean rejuvenated) {
        this.rejuvenated = rejuvenated;
    }

    @Override
    public String getName() {
        return "REJUVENATION PHASE";
    }
}
