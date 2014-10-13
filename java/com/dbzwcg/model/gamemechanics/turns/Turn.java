/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.turns;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.declare.DeclarePhase;
import com.dbzwcg.model.match.phase.discard.DiscardPhase;
import com.dbzwcg.model.match.phase.draw.DrawPhase;
import com.dbzwcg.model.match.phase.noncombat.NonCombatPhase;
import com.dbzwcg.model.match.phase.pur.PowerUpPhase;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Turn extends GameMechanic {

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL)
    private MatchPlayer owner;

    @Column
    private Integer turnNumber;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private DrawPhase drawPhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private NonCombatPhase nonCombatPhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private PowerUpPhase powerUpPhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private DeclarePhase declarePhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private CombatPhase CombatPhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private DiscardPhase discardPhase;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private RejuvenationPhase rejuvenationPhase;

    public MatchPlayer getOwner() {
        return owner;
    }

    public void setOwner(MatchPlayer owner) {
        this.owner = owner;
    }

    public Integer getTurnNumber() {
        return turnNumber;
    }

    public void setTurnNumber(Integer turnNumber) {
        this.turnNumber = turnNumber;
    }

    public DrawPhase getDrawPhase() {
        return drawPhase;
    }

    public void setDrawPhase(DrawPhase drawPhase) {
        this.drawPhase = drawPhase;
    }

    public NonCombatPhase getNonCombatPhase() {
        return nonCombatPhase;
    }

    public void setNonCombatPhase(NonCombatPhase nonCombatPhase) {
        this.nonCombatPhase = nonCombatPhase;
    }

    public PowerUpPhase getPowerUpPhase() {
        return powerUpPhase;
    }

    public void setPowerUpPhase(PowerUpPhase powerUpPhase) {
        this.powerUpPhase = powerUpPhase;
    }

    public DeclarePhase getDeclarePhase() {
        return declarePhase;
    }

    public void setDeclarePhase(DeclarePhase declarePhase) {
        this.declarePhase = declarePhase;
    }

    public CombatPhase getCombatPhase() {
        return CombatPhase;
    }

    public void setCombatPhase(CombatPhase CombatPhase) {
        this.CombatPhase = CombatPhase;
    }

    public DiscardPhase getDiscardPhase() {
        return discardPhase;
    }

    public void setDiscardPhase(DiscardPhase discardPhase) {
        this.discardPhase = discardPhase;
    }

    public RejuvenationPhase getRejuvenationPhase() {
        return rejuvenationPhase;
    }

    public void setRejuvenationPhase(RejuvenationPhase rejuvenationPhase) {
        this.rejuvenationPhase = rejuvenationPhase;
    }

    @Override
    public String getName() {
        return "TURN";
    }
}
