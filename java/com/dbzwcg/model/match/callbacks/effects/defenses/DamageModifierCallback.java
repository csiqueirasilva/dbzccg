/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.callbacks.effects.defenses;

import com.dbzwcg.model.match.callbacks.Callback;
import com.dbzwcg.model.match.damage.modifiers.MatchDamageModifier;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
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
public abstract class DamageModifierCallback extends Callback {

    @OneToMany(cascade = CascadeType.ALL)
    protected List<MatchPlayer> player;

    @Embedded
    protected MatchDamageModifier modifier;

    protected DamageModifierCallback() {
    }
    
    public DamageModifierCallback(List<MatchPlayer> p, MatchDamageModifier effect) {
        this.player = p;
        this.modifier = effect;
        this.life = 1;
    }
}