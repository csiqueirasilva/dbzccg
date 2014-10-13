package com.dbzwcg.model.match.card.effects.generics.defenses;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.DefenseEffect;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.effects.AttackType;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinTable;
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
public abstract class GenericDefense extends GenericCardEffect implements DefenseEffect {

    @Transient
    protected List<AttackType> defenses;

    @Transient
    protected Boolean stopsFocused;

    public GenericDefense() {
        this.defenses = new ArrayList<>();
        this.stopsFocused = true;
    }
    
    @Override
    public void postEffect(Match m, MatchPlayer p) {
        // do nothing
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase());
        AttackEvent attackEvent = icp.getAttackEvent();
        DefenseEvent de = new DefenseEvent(this, p, attackEvent, this);
        MatchDLO.applyInterruptedEvent(m, de);
    }

    @Override
    public Boolean playable(Match m, MatchPlayer p) {
        Boolean ret = false;

        try {
            CombatPhase phase = (CombatPhase) m.getCurrentPhase();
            InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
            ret = icp.getDefendingPlayer() == p && !icp.getSkipped() && icp.getAttackEvent() != null && this.defenses.indexOf(icp.getAttackEvent().getType()) != -1;
        } catch (Exception e) {
        }

        return ret;
    }

    @Override
    public Boolean stops(AttackEvent attack) {
        return this.defenses.indexOf(attack.getType()) != -1;
    }

    @Override
    public Boolean stopsFocused() {
        return this.stopsFocused;
    }
}
