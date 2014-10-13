/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.floatings.defenses;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.effects.defenses.StopsAttackCallback;
import com.dbzwcg.model.match.card.effects.floatings.FloatingEffect;
import com.dbzwcg.model.match.card.effects.interfaces.DefenseEffect;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.effects.AttackType;
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

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public class StopAttack extends FloatingEffect implements DefenseEffect {

    @ElementCollection(targetClass = Enum.class)
    @JoinTable
    protected List<AttackType> type;
    
    @Column
    protected Boolean stopsFocused;

    protected StopAttack() {
    }

    public StopAttack(List<AttackType> type,
            GameMechanic creator, List<MatchPlayer> player) {
        super(creator, player);
        this.type = type;
    }

    @Override
    public void enterGame(Match m) {
        this.callback = new StopsAttackCallback(this.players, this);
        m.getCallbacks().registerCallback(DefenseEvent.class, this.callback);
    }

    @Override
    public void leaveGame(Match m) {
        m.getCallbacks().unregisterCallback(DefenseEvent.class, this.callback);
    }

    @Override
    public String getName() {
        String playerList = super.players.get(0).getName();
        
        for(int i = 1; i < super.players.size(); i++) {
            playerList += ", " + super.players.get(i).getName();
        }
        
        return "Stops the next " + this.type + " attack made against " + 
                (super.players.size() > 1 ? " these players: " : " this player: ") + playerList + ".";
    }

    @Override
    public Boolean stops(AttackEvent attack) {
        return this.type.indexOf(attack.getType()) != -1;
    }

    @Override
    public Boolean stopsFocused() {
        return this.stopsFocused;
    }
}
