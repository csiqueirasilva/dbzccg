/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.callbacks.effects.defenses;

import com.dbzwcg.model.events.turnphase.combat.EndCombatPhaseEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.floatings.defenses.StopAttack;
import com.dbzwcg.model.match.log.MatchEvent;
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
public class StopsCombatAttacksCallback extends StopsAttackCallback {

    protected StopsCombatAttacksCallback() {
    }

    public StopsCombatAttacksCallback(List<MatchPlayer> p, StopAttack effect) {
        super(p, effect);
    }

    @Override
    protected void checkTerminate(Match m, MatchEvent e, Boolean stopped) {
        if (e instanceof EndCombatPhaseEvent) {
            this.setLife(0);
            this.effect.leaveGame(m);
        }
    }
}