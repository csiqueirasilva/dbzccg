/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.generics.attacks;

import com.dbzwcg.types.effects.AttackType;
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
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public class GenericEnergyAttack extends GenericAttack {
    public GenericEnergyAttack() {
        super.usePat = false;
        super.attackType = AttackType.ENERGY;
        super.lifeCardDamage = 4;
    }
}
