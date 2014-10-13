/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.combat;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
public class FinalPhysicalAttack extends GameMechanic {
    final static private String FINAL_PHYSICAL_ATTACK_NAME = "Final Physical Attack";
    
    @Override
    public String getName() {
        return FINAL_PHYSICAL_ATTACK_NAME;
    }   
}