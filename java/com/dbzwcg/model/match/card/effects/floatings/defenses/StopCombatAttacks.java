/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.floatings.defenses;

import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.effects.defenses.StopsCombatAttacksCallback;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.effects.AttackType;
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
public class StopCombatAttacks extends StopAttack {

    protected StopCombatAttacks() {
    }

    public StopCombatAttacks(List<AttackType> type, GameMechanic creator, List<MatchPlayer> player) {
        super(type, creator, player);
    }

    @Override
    public void enterGame(Match m) {
        this.callback = new StopsCombatAttacksCallback(this.players, this);
        m.getCallbacks().registerCallback(DefenseEvent.class, this.callback);
    }
    
    @Override
    public String getName() {
        String playerList = super.players.get(0).getName();
        
        for(int i = 1; i < super.players.size(); i++) {
            playerList += ", " + super.players.get(i).getName();
        }
        
        return "Stops the all " + this.type + " attacks made against " + 
                (super.players.size() > 1 ? " these players: " : " this player: ") + playerList + " in this combat.";
    }
    
}
