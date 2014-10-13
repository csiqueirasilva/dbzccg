/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.log.creator;

import com.dbzwcg.model.match.players.MatchPlayer;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
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
public class PlayerMatchEventCreator extends MatchEventCreator {

    public PlayerMatchEventCreator() {
    }
    
    public PlayerMatchEventCreator(MatchPlayer player) {
        this.player = player;
    }

    @Override
    public String getName() {
        return "Player Event Creator";
    }

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn
    private MatchPlayer player;

    public MatchPlayer getPlayer() {
        return this.player;
    }

    public void setPlayer(MatchPlayer player) {
        this.player = player;
    }
}
