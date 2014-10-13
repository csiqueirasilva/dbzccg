/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.combat;

import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.PhaseType;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class CombatPhase extends Phase {
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InternalCombatPhase> phases;
    
    @JoinColumn
    @OneToOne( optional = false, cascade = CascadeType.ALL)
    private MatchPlayer declaringPlayer;
    
    @JoinColumn
    @OneToOne( optional = false, cascade = CascadeType.ALL)
    private MatchPlayer declaredPlayer;

    public CombatPhase() {
        super.type = PhaseType.COMBAT;
    }

    public List<InternalCombatPhase> getPhases() {
        return phases;
    }

    public void setPhases(List<InternalCombatPhase> phases) {
        this.phases = phases;
    }

    public MatchPlayer getDeclaringPlayer() {
        return declaringPlayer;
    }

    public void setDeclaringPlayer(MatchPlayer declaringPlayer) {
        this.declaringPlayer = declaringPlayer;
    }

    public MatchPlayer getDeclaredPlayer() {
        return declaredPlayer;
    }

    public void setDeclaredPlayer(MatchPlayer declaredPlayer) {
        this.declaredPlayer = declaredPlayer;
    }

    @Override
    public String getName() {
        return "COMBAT PHASE";
    }
}
