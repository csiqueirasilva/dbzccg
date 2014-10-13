/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.discard;

import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.PhaseType;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
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
public class DiscardPhase extends Phase {

    @JoinColumn
    @OneToOne( cascade = CascadeType.ALL, optional = false)
    private MatchPlayer owner;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
    private List<MatchPlayer> players;

    @OneToOne( cascade = CascadeType.ALL, optional = false)
    @JoinColumn
    private MatchPlayer cursor;

    public MatchPlayer getCursor() {
        return cursor;
    }

    public void setCursor(MatchPlayer cursor) {
        this.cursor = cursor;
    }
    
    public MatchPlayer getOwner() {
        return owner;
    }

    public void setOwner(MatchPlayer owner) {
        this.owner = owner;
    }

    public List<MatchPlayer> getPlayers() {
        return players;
    }

    public void setPlayers(List<MatchPlayer> players) {
        this.players = players;
    }
    
    public DiscardPhase() {
        super.type = PhaseType.DISCARD;
    } 
    
    @Override
    public String getName() {
        return "DISCARD PHASE";
    }
    
}
