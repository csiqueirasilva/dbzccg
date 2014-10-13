/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.declare;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DeclarePhaseDeclareEvent extends MatchEvent {

    private MatchPlayer declaredPlayer;

    public MatchPlayer getDeclaredPlayer() {
        return declaredPlayer;
    }

    public void setDeclaredPlayer(MatchPlayer declaredPlayer) {
        this.declaredPlayer = declaredPlayer;
    }

    public DeclarePhaseDeclareEvent(GameMechanic gameMechanic, MatchPlayer player, MatchPlayer declaredPlayer) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = null;
        this.declaredPlayer = declaredPlayer;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        Turn lastTurn = MatchDLO.getLastTurn(m);
        lastTurn.setCombatPhase(new CombatPhase());
        AfterDeclarePhaseEvent adpe = new AfterDeclarePhaseEvent((GameMechanic) this.getSourceRawObject(), super.player, this.declaredPlayer);
        MatchDLO.applyEvent(m, adpe);
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + " declared combat.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
