/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.generics.defenses.GenericDefense;
import com.dbzwcg.model.match.types.CardFieldType;
import com.dbzwcg.types.effects.AttackType;
import java.util.ArrayList;
import java.util.List;
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
public class C056 extends GenericDefense  {

    private static List<MatchCost> COST;

    public C056() {
        if (COST == null) {
            COST = new ArrayList<>();
        }
        super.cost = C056.COST;
        super.defenses.add(AttackType.ENERGY);
        super.stopsFocused = true;
        super.targetGroupAfterUse = CardFieldType.discardPile;
        super.sourceGroupAfterUse = CardFieldType.inPlay;
    }
}
