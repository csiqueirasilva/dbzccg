/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.effects.defenses;

import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.defender.DefenderPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.callbacks.Callback;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.card.effects.floatings.defenses.StopAttack;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public class StopsAttackCallback extends Callback {

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    protected List<MatchPlayer> player;
    
    @OneToOne( cascade = CascadeType.ALL)
    protected StopAttack effect;

    protected StopsAttackCallback() {
    }

    public StopsAttackCallback(List<MatchPlayer> p, StopAttack effect) {
        this.player = p;
        this.effect = effect;
        this.priority = Integer.MAX_VALUE;
        this.life = 1;
    }

    protected void checkTerminate(Match m, MatchEvent e, Boolean stopped) {
        if (stopped) {
            this.setLife(0);
            MatchDLO.removeFloatingEffect(m, this.effect);
        }
    }

    @Override
    public CallbackReturn exec(Match m, MatchEvent e) {
        CallbackReturn ret = new CallbackReturn();
        Boolean stopped = false;
        if (e instanceof DefenderPhaseEvent) {
            DefenderPhaseEvent defenderPhaseEvent = (DefenderPhaseEvent) e;
            Integer playerIndex = this.player.indexOf(defenderPhaseEvent.getPlayer());
            if (playerIndex != -1) {
                CombatPhase phase = (CombatPhase) m.getCurrentPhase();
                InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);

                if (this.effect.stops(icp.getAttackEvent())) {
                    DefenseEvent de = new DefenseEvent(this.effect, this.player.get(playerIndex), icp.getAttackEvent(), this.effect);
                    MatchDLO.applyInterruptedEvent(m, de);
                    ret.setSkipEventEffect(true);
                    stopped = true;
                }
            }
        }

        this.checkTerminate(m, e, stopped);
        return ret;
    }
}
