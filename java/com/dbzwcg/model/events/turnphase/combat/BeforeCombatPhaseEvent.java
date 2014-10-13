/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.events.turnphase.combat.internal.attacker.AttackerPreparePhaseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.defender.DefenderPreparePhaseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.AddInternalPhaseEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeCombatPhaseEvent extends MatchEvent {

    public BeforeCombatPhaseEvent(GameMechanic generator, MatchPlayer target) {
        super(generator, target);
        super.player = target;
    }

    @Override
    public String logMessage() {
        return "BEFORE COMBAT PHASE EVENT";
    }

    @Override
    protected void phaseEffect(Match m) {
        CombatPhase phase = (CombatPhase) this.getSourceRawObject();
        m.setCurrentPhase(phase);
        MatchDLO.getLastTurn(m).setCombatPhase(phase);
        SetPersonalityInControlEvent spice = new SetPersonalityInControlEvent(phase, phase.getDeclaringPlayer(), phase.getDeclaringPlayer().getMainPersonality());
        MatchDLO.applyEvent(m, spice);
        spice = new SetPersonalityInControlEvent(phase, phase.getDeclaredPlayer(), phase.getDeclaredPlayer().getMainPersonality());
        MatchDLO.applyEvent(m, spice);
        AttackerPreparePhaseEvent appe = new AttackerPreparePhaseEvent(phase, phase.getDeclaringPlayer());
        MatchDLO.applyEvent(m, appe);
        DefenderPreparePhaseEvent dppe = new DefenderPreparePhaseEvent(phase, phase.getDeclaredPlayer());
        MatchDLO.applyEvent(m, dppe);
        DefenderCombatDrawEvent dcde = new DefenderCombatDrawEvent(phase, phase.getDeclaredPlayer());
        MatchDLO.applyEvent(m, dcde);
        AddInternalPhaseEvent ape = new AddInternalPhaseEvent(phase);
        MatchDLO.applyEvent(m, ape);
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}