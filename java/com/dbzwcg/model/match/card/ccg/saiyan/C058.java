/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.floatings.FloatingEffectDLO;
import com.dbzwcg.model.match.card.effects.generics.attacks.GenericAttackUpdateDefendingEnemyAnger;
import com.dbzwcg.model.match.players.MatchPlayer;
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
public class C058 extends GenericAttackUpdateDefendingEnemyAnger {

    private static List<MatchCost> COST;

    public C058() {
        if (C058.COST == null) {
            C058.COST = new ArrayList<>();
        }

        super.cost = C058.COST;
        super.usePat = true;
        super.sourceGroupAfterUse = CardFieldType.inPlay;
        super.targetGroupAfterUse = CardFieldType.discardPile;
        super.powerStageDamage = 3;
        super.attackType = AttackType.PHYSICAL;
        super.enemyAngerUpdate = -1;
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        FloatingEffectDLO.stopsAllEnergyAttacksInCombat(m, this);
        super.playEffect(m, p);
    }
}
