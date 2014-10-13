/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.combat.internal;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class InternalCombatPhase extends GameMechanic implements Serializable {

    @Column
    private Integer phaseNumber;
    
    @JoinColumn
    @OneToOne( cascade = CascadeType.ALL, optional = false)
    private MatchPlayer attackingPlayer;

    @JoinColumn
    @OneToOne( cascade = CascadeType.ALL, optional = false)
    private MatchPlayer defendingPlayer;
    
    @JoinColumn
    @OneToOne( cascade = CascadeType.ALL)
    private AttackEvent attackEvent;

    @Column
    private Boolean skipped;

    @Column
    private Boolean attackerPhasePassed;
    
    @Column
    private Boolean defenderPhasePassed;    

    public Boolean getAttackerPhasePassed() {
        return attackerPhasePassed;
    }

    public void setAttackerPhasePassed(Boolean attackerPhasePassed) {
        this.attackerPhasePassed = attackerPhasePassed;
    }

    public Boolean getDefenderPhasePassed() {
        return defenderPhasePassed;
    }

    public void setDefenderPhasePassed(Boolean defenderPhasePassed) {
        this.defenderPhasePassed = defenderPhasePassed;
    }

    public Boolean getSkipped() {
        return skipped;
    }

    public void setSkipped(Boolean skipped) {
        this.skipped = skipped;
    }
    
    public AttackEvent getAttackEvent() {
        return attackEvent;
    }

    public void setAttackEvent(AttackEvent attackEffect) {
        this.attackEvent = attackEffect;
    }

    public Integer getPhaseNumber() {
        return phaseNumber;
    }

    public void setPhaseNumber(Integer phaseNumber) {
        this.phaseNumber = phaseNumber;
    }

    public MatchPlayer getAttackingPlayer() {
        return attackingPlayer;
    }

    public void setAttackingPlayer(MatchPlayer attackingPlayer) {
        this.attackingPlayer = attackingPlayer;
    }

    public MatchPlayer getDefendingPlayer() {
        return defendingPlayer;
    }

    public void setDefendingPlayer(MatchPlayer defendingPlayer) {
        this.defendingPlayer = defendingPlayer;
    }

    @Override
    public String getName() {
        return "INTERNAL COMBAT PHASE";
    }
}
