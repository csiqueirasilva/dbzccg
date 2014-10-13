/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.ccg.saiyan;

import com.dbzwcg.model.events.cardmove.DiscardCardEvent;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.generics.attacks.GenericAttack;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.PersonalityType;
import com.dbzwcg.types.effects.AttackType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
public class C025 extends GenericAttack {

    private static List<MatchCost> COST;

    public C025() {
        super();
        if (COST == null) {
            COST = new ArrayList<>();
        }
        super.cost = C025.COST;
        super.usePat = true;
        super.attackType = AttackType.PHYSICAL;
    }

    @Override
    public void postEffect(Match m, MatchPlayer p) {
        MatchCardGroupDLO.bottomDrawEventFromMatchCardGroup(this, m, p.getDiscardPile(), p, 1);
    }

    @Override
    public void afterEffect(Match m, MatchPlayer p) {
        MatchCard card = this.getCard();
        Set<PersonalityType> personalities = CombatPhaseDLO.getPerformingAttackPersonality(m);
        
        if(!personalities.contains(PersonalityType.GOKU) || card.getNumberOfUses() == 2) {
            MoveCardMechanic mcm = new MoveCardMechanic(this.getCard(), p.getRemovedFromTheGame(), p.getInPlay());
            DiscardCardEvent dce = new DiscardCardEvent(this, p, mcm);
            MatchDLO.applyInterruptedEvent(m, dce);
        }
    }
}