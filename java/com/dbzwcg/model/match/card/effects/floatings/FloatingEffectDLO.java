/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.floatings;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.floatings.defenses.StopCombatAttacks;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.effects.AttackType;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author csiqueira
 */
public class FloatingEffectDLO {
    public static void stopsAllEnergyAttacksInCombat(Match m, GameMechanic effect) {
        List<AttackType> attacks = new ArrayList<>();
        attacks.add(AttackType.ENERGY);
        List<MatchPlayer> players = CombatPhaseDLO.getCombatPlayers((CombatPhase) m.getCurrentPhase());
        FloatingEffectDLO.stopsAllAttacksRemainderOfCombat(m, players, attacks, effect);
    }
    
    private static void stopsAllAttacksRemainderOfCombat(Match m, List<MatchPlayer> players, List<AttackType> attackTypes, GameMechanic effect) {
        StopCombatAttacks sca = new StopCombatAttacks(attackTypes, effect, players);
        MatchDLO.applyFloatingEffect(m, sca);
    }
}
