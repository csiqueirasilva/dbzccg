/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.generics.defenses;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.ResolveInternalCombatPhaseDamageEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.callbacks.effects.defenses.DefenderDamageModifierCallback;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.damage.modifiers.MatchDamageModifier;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.ArrayList;
import java.util.List;
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
public abstract class GenericPrevention extends GenericDefense {
    
    @Transient
    protected final MatchDamageModifier mdm;
    
    public GenericPrevention () {
        this.mdm = new MatchDamageModifier();
        mdm.setPriority(Integer.MIN_VALUE);
        MatchDamage modifier = new MatchDamage();
        mdm.setModifier(modifier);
    }
    
    @Override
    public void playEffect(Match m, MatchPlayer p) {
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase());
        AttackEvent attackEvent = icp.getAttackEvent();
        
        List<MatchPlayer> players = new ArrayList<>();
        players.add(icp.getDefendingPlayer());
        
        DefenderDamageModifierCallback ddmc = new DefenderDamageModifierCallback(players, this.mdm);
        m.getCallbacks().registerCallback(ResolveInternalCombatPhaseDamageEvent.class, ddmc);
        
        DefenseEvent de = new DefenseEvent(this, p, attackEvent, this);
        MatchDLO.applyInterruptedEvent(m, de);
    }
    
    @Override
    public Boolean stops(AttackEvent attack) {
        return false;
    }

    @Override
    public Boolean stopsFocused() {
        return false;
    }
}
