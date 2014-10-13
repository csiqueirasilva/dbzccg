/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.effects.defenses;

import com.dbzwcg.model.events.turnphase.combat.internal.ResolveInternalCombatPhaseDamageEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.damage.modifiers.MatchDamageModifier;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
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
public class DefenderDamageModifierCallback extends DamageModifierCallback {

    protected DefenderDamageModifierCallback() {
    }

    public DefenderDamageModifierCallback(List<MatchPlayer> p, MatchDamageModifier effect) {
        super(p, effect);
        this.priority = Integer.MIN_VALUE;
    }

    @Override
    public CallbackReturn exec(Match m, MatchEvent e) {
        CallbackReturn ret = new CallbackReturn();
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);

        if (this.player.indexOf(icp.getDefendingPlayer()) != -1) {
            ((ResolveInternalCombatPhaseDamageEvent) e).getModifiers().add(this.modifier);
            this.setLife(0);
        }
        
        return ret;
    }
}
