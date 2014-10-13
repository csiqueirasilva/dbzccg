/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.generics.attacks;

import com.dbzwcg.model.events.AngerChangeEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class GenericAttackUpdateSelfAnger extends GenericAttack {
    
    @Transient
    protected Integer selfAngerUpdate;
    
    public GenericAttackUpdateSelfAnger() {
        super();
        this.selfAngerUpdate = 0;
    }

    @Override
    public void playEffect(Match m, MatchPlayer p) {
        AngerChangeEvent ace = new AngerChangeEvent(this, p, this.selfAngerUpdate, false);
        MatchDLO.applyInterruptedEvent(m, ace);
        
        super.playEffect(m, p);
    }    
}