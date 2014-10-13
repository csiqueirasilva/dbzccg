/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.generics.personalities;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.players.MatchPlayer;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
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
public class GenericPersonalityEffect extends GenericCardEffect {

    @Override
    public void postEffect(Match m, MatchPlayer p) {
        // nothing
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        // nothing
    }

    @Override
    public void play(Match m, MatchPlayer p) {
        // nothing
    }
    
    @Override
    public Boolean playable(Match m, MatchPlayer p) {
        return false;
    }
}
