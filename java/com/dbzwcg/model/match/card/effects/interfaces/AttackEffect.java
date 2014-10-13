/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.interfaces;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public interface AttackEffect {
    public MatchDamage calculateDamage(Match m, MatchPersonality performingAttack, MatchPersonality defendingAttack);
    public Boolean checkSuccess(Match m, MatchPlayer player, AttackEvent attackEvent);
}
