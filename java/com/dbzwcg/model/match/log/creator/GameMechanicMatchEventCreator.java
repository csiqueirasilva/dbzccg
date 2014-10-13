/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.log.creator;

import com.dbzwcg.model.gamemechanics.GameMechanic;
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
public class GameMechanicMatchEventCreator extends MatchEventCreator {

    @OneToOne( optional = false, cascade = CascadeType.ALL)
    @JoinColumn
    private GameMechanic gameMechanic;

    public GameMechanicMatchEventCreator() {
    }

    public GameMechanicMatchEventCreator(GameMechanic gameMechanic) {
        this.gameMechanic = gameMechanic;
    }

    @Override
    public String getName() {
        return "Game Mechanic Event Creator";
    }

    public GameMechanic getGameMechanic() {
        return this.gameMechanic;
    }

    public void setGameMechanic(GameMechanic gameMechanic) {
        this.gameMechanic = gameMechanic;
    }
}
