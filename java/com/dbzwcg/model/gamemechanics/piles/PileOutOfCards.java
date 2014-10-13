/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.piles;

import com.dbzwcg.model.gamemechanics.GameMechanic;
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
public class PileOutOfCards extends GameMechanic {
    @Override
    public String getName() {
        return "Pile out of cards";
    }
}
