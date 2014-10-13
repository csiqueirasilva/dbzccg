/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.floatings;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.Callback;
import com.dbzwcg.model.match.card.effects.GameEffect;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@PrimaryKeyJoinColumn
@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class FloatingEffect extends GameEffect {

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn
    protected GameMechanic creator;
    
    @ManyToMany
    @JoinTable
    protected List<MatchPlayer> players;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn
    protected Callback callback;
    
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn
    protected Match match;

    protected FloatingEffect() {
    }
    
    public FloatingEffect (GameMechanic effect, List<MatchPlayer> player) {
        if(player == null || player.isEmpty()) {
            throw new UnsupportedOperationException("Needs a player to initialize the floating effect");
        } 

        if(effect == null) {
            throw new UnsupportedOperationException("Needs a floating effect reference to initialize it");
        } 

        this.creator = effect;
        this.players = player;
    }
    
    public abstract void enterGame(Match m);
    public abstract void leaveGame(Match m);
}
