/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.generics.attacks.GenericAttackUpdateSelfAnger;
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
public class C006 extends GenericAttackUpdateSelfAnger {

    private static List<MatchCost> COST;

    public C006() {
        super();
        if (C006.COST == null) {
            C006.COST = new ArrayList<>();
        }
        super.cost = C006.COST;
        super.usePat = true;
        super.sourceGroupAfterUse = CardFieldType.inPlay;
        super.targetGroupAfterUse = CardFieldType.discardPile;
        super.attackType = AttackType.PHYSICAL;
        super.selfAngerUpdate = 1;
    }
}