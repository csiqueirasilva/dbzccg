/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.generics.attacks;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.AttackEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTable;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.effects.AttackType;
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
public abstract class GenericAttack extends GenericCardEffect implements AttackEffect {

    @Transient
    protected Integer lifeCardDamage;
    @Transient
    protected Integer powerStageDamage;
    @Transient
    protected Boolean usePat;
    @Transient
    protected AttackType attackType;
    
    public GenericAttack() {
        this.lifeCardDamage = 0;
        this.powerStageDamage = 0;
        this.usePat = false;
    }
    
    @Override
    public Boolean playable(Match m, MatchPlayer p) {
        Boolean ret = false;
        try {
            CombatPhase phase = (CombatPhase) m.getCurrentPhase();
            InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
            ret = icp.getAttackingPlayer() == p && !icp.getSkipped() && icp.getAttackEvent() == null;
        } catch (Exception e) {
        }
        return ret;
    }

    @Override
    public MatchDamage calculateDamage(Match m, MatchPersonality performingAttack, MatchPersonality defendingAttack) {
        MatchDamage md = new MatchDamage();
        Integer stageDamage = 0;
        Integer lcDamage = 0;

        if (this.usePat) {
            PhysicalAttackTable pat = m.getPat();
            stageDamage = pat.comparePowerStages(performingAttack, defendingAttack);
        }
        
        stageDamage += this.powerStageDamage;
        lcDamage += this.lifeCardDamage;
        
        md.setStages(stageDamage);
        md.setCards(lcDamage);
        
        return md;
    }

    @Override
    public Boolean checkSuccess(Match m, MatchPlayer player, AttackEvent attackEvent) {
        return true;
    }
    
    @Override
    public void postEffect(Match m, MatchPlayer p) {
        // no success effect
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        AttackEvent ae = new AttackEvent(this, p, this, this.attackType);
        MatchDLO.applyInterruptedEvent(m, ae);
    }    
}
