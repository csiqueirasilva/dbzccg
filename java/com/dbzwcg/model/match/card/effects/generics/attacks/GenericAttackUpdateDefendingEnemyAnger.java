/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.generics.attacks;

import com.dbzwcg.model.events.AngerChangeEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public class GenericAttackUpdateDefendingEnemyAnger extends GenericAttack {
    
    @Transient
    protected Integer enemyAngerUpdate;
    
    public GenericAttackUpdateDefendingEnemyAnger() {
        super();
        this.enemyAngerUpdate = 0;
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        
        AngerChangeEvent ace = new AngerChangeEvent(this, icp.getDefendingPlayer(), this.enemyAngerUpdate, false);
        MatchDLO.applyInterruptedEvent(m, ace);
        
        super.playEffect(m, p);
    }    
}
