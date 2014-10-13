/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardeffects.attacks;

import com.dbzwcg.model.events.cardeffects.defenses.DefenseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.ResolveInternalCombatPhaseDamageEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.AttackEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.dbzwcg.types.effects.AttackType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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
public class AttackEvent extends MatchEvent {

    @OneToOne
    @JoinColumn
    @JsonSerialize(using = IdValueJsonSerializer.class)
    private GenericCardEffect attack;
    
    @JsonSerialize(using = EnumJsonSerializer.class)
    @Column
    private AttackType type;
    
    @OneToMany
    private List<DefenseEvent> defenses;
    
    @Column
    private Integer tentativeDefenses;
    
    @Column
    private Integer requiredDefenses;
    
    @JsonSerialize(using = IdValueJsonSerializer.class)
    @JoinColumn
    @OneToOne
    private MatchPersonality defendingPersonality;

    @JsonSerialize(using = IdValueJsonSerializer.class)
    @JoinColumn
    @OneToOne
    private MatchPersonality attackingPersonality;

    public Boolean stopped () {
        Boolean ret = this.requiredDefenses.equals(this.defenses.size());
        return ret;
    }
    
    public void incrementTentativeDefenses(Match m) {
        this.tentativeDefenses++;
        if(this.tentativeDefenses.equals(this.requiredDefenses)) {
            ResolveInternalCombatPhaseDamageEvent ricpe = new ResolveInternalCombatPhaseDamageEvent((CombatPhase) m.getCurrentPhase());
            MatchDLO.applyInterruptedEvent(m, ricpe);
        }
    } 
    
    public Integer getTentativeDefenses() {
        return tentativeDefenses;
    }

    public void setTentativeDefenses(Integer tentativeDefenses) {
        this.tentativeDefenses = tentativeDefenses;
    }

    public MatchPersonality getDefendingPersonality() {
        return this.defendingPersonality;
    }

    public void setDefendingPersonality(MatchPersonality defendingPersonality) {
        this.defendingPersonality = defendingPersonality;
    }

    public MatchPersonality getAttackingPersonality() {
        return this.attackingPersonality;
    }

    public void setAttackingPersonality(MatchPersonality attackingPersonality) {
        this.attackingPersonality = attackingPersonality;
    }

    public Integer getRequiredDefenses() {
        return this.requiredDefenses;
    }

    public void setRequiredDefenses(Integer requiredDefenses) {
        this.requiredDefenses = requiredDefenses;
    }

    public List<DefenseEvent> getDefenses() {
        return this.defenses;
    }

    public void setDefenses(List<DefenseEvent> defenses) {
        this.defenses = defenses;
    }

    public AttackEffect getAttack() {
        return (AttackEffect) attack;
    }

    public void setAttack(AttackEffect attack) {
        this.attack = (GenericCardEffect) attack;
    }

    public AttackType getType() {
        return type;
    }

    public void setType(AttackType type) {
        this.type = type;
    }

    protected AttackEvent(){
    }
    
    public AttackEvent(GameMechanic gameMechanic, MatchPlayer player, AttackEffect attack, AttackType type) {
        super(gameMechanic, player);
        super.player = player;
        this.attack = (GenericCardEffect) attack;
        this.type = type;
        this.defenses = new ArrayList<>();
        this.tentativeDefenses = 0;
        this.requiredDefenses = 1;
    }

    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        icp.setAttackEvent(this);
        this.attackingPersonality = icp.getAttackingPlayer().getPersonalityInControl();
        this.defendingPersonality = icp.getDefendingPlayer().getPersonalityInControl();
    }

    @Override
    public String logMessage() {
        return this.type + " ATTACK EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
