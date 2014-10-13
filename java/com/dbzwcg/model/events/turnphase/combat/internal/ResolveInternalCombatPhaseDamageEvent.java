/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.internal;

import com.dbzwcg.model.events.cardeffects.CardPostEffectEvent;
import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.events.turnphase.combat.damage.BeforeDamageApplicationEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.AttackEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.damage.modifiers.MatchDamageModifierSet;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;

/**
 *
 * @author csiqueira
 */
public class ResolveInternalCombatPhaseDamageEvent extends MatchEvent {

    private final MatchDamageModifierSet modifiers;

    public MatchDamageModifierSet getModifiers() {
        return modifiers;
    }
    
    public ResolveInternalCombatPhaseDamageEvent(CombatPhase generator) {
        super(generator);
        this.modifiers = new MatchDamageModifierSet();
    }

    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) this.getSourceRawObject();
        InternalCombatPhase icp
                = phase.getPhases()
                .get(((CombatPhase) this.getSourceRawObject()).getPhases().size() - 1);

        AttackEvent attack = icp.getAttackEvent();

        if (attack != null) {
            GenericCardEffect mce = (GenericCardEffect) attack.getAttack();
            if (!attack.stopped()) {
                MatchDamage damage = ((AttackEffect) mce).calculateDamage(m, icp.getAttackingPlayer().getPersonalityInControl(), icp.getDefendingPlayer().getPersonalityInControl());
                this.modifiers.applyDamage(damage);

                BeforeDamageApplicationEvent bdae = new BeforeDamageApplicationEvent(mce, icp.getDefendingPlayer(), damage);
                MatchDLO.applyInterruptedEvent(m, bdae);
                
                CardPostEffectEvent cpee = new CardPostEffectEvent(mce, icp.getAttackingPlayer());
                MatchDLO.applyInterruptedEvent(m, cpee);
            }
        }
        
        DecideEndCombatPhaseEvent aipe = new DecideEndCombatPhaseEvent(phase);
        MatchDLO.applyEvent(m, aipe);
    }

    @Override
    public String logMessage() {
        return "RESOLVE ATTACK DAMAGE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
