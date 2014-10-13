/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.generics.attacks.GenericAttack;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTable;
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
public class C046 extends GenericAttack {

    private static List<MatchCost> COST;

    public C046() {
        super();
        if (C046.COST == null) {
            C046.COST = new ArrayList<>();
        }
        super.cost = C046.COST;
        super.usePat = true;
        super.sourceGroupAfterUse = CardFieldType.inPlay;
        super.targetGroupAfterUse = CardFieldType.discardPile;
        super.attackType = AttackType.PHYSICAL;
    }    

    @Override
    public MatchDamage calculateDamage(Match m, MatchPersonality performingAttack, MatchPersonality defendingAttack) {
        PhysicalAttackTable pat = m.getPat();
        MatchDamage md = new MatchDamage();
        Integer stageDamage = 2*pat.comparePowerStages(performingAttack, defendingAttack);
        md.setStages(stageDamage);
        return md;
    }
}