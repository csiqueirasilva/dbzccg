/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.types.PhaseType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@PrimaryKeyJoinColumn
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Phase extends GameMechanic implements Serializable {
    
    @JsonSerialize(using = EnumJsonSerializer.class)
    @Column
    protected PhaseType type;
            
    public PhaseType getType() {
        return this.type;
    }
}