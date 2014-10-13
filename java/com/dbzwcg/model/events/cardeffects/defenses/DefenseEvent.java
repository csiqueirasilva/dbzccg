/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardeffects.defenses;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.DefenseEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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
public class DefenseEvent extends MatchEvent {

    @ManyToOne
    @JoinColumn
    @JsonSerialize(using = IdValueJsonSerializer.class)
    private AttackEvent attack;
    
    @OneToOne
    @JoinColumn
    @JsonSerialize(using = IdValueJsonSerializer.class)
    private GenericCardEffect defense;

    @Column
    private Boolean stopped;

    protected DefenseEvent() {
    }
    
    public AttackEvent getAttack() {
        return attack;
    }

    public void setAttack(AttackEvent attack) {
        this.attack = attack;
    }

    public DefenseEffect getDefense() {
        return (DefenseEffect) defense;
    }

    public void setDefense(DefenseEffect defense) {
        this.defense = (GenericCardEffect) defense;
    }

    public Boolean isStopped() {
        return stopped;
    }

    public void setStopped(Boolean stopped) {
        this.stopped = stopped;
    }

    public DefenseEvent(GameMechanic gameMechanic, MatchPlayer p, AttackEvent attackEvent, DefenseEffect defenseEffect) {
        super(gameMechanic, p);
        super.player = p;
        this.attack = attackEvent;
        this.defense = (GenericCardEffect) defenseEffect;
    }

    @Override
    protected void phaseEffect(Match m) {
        if (((DefenseEffect) this.defense).stops(this.attack)) {
            this.attack.getDefenses().add(this);
            this.stopped = true;
        }

        this.attack.incrementTentativeDefenses(m);
    }

    @Override
    public String logMessage() {
        return "DEFENSE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
