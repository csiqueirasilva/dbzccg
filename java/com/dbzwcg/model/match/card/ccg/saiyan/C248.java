/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.match.card.effects.generics.attacks.GenericEnergyAttack;
import com.dbzwcg.model.match.types.CardFieldType;
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
public class C248 extends GenericEnergyAttack {
    public C248() {
        super.lifeCardDamage = 5;
        super.sourceGroupAfterUse = CardFieldType.inPlay;
        super.targetGroupAfterUse = CardFieldType.discardPile;
    }
}
