/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turn;

import com.dbzwcg.model.gamemechanics.turns.EndTurn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class PlayerFinishTurnEvent extends MatchEvent {
    public PlayerFinishTurnEvent(EndTurn gameMechanic, MatchPlayer target) {
        super(gameMechanic, target);
        super.player = target;
        super.nextEvent = null;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        Integer index = m.getPlayers().indexOf(super.player);
        index = (index + 1)%m.getPlayers().size();
        PlayerBetweenTurnEvent pste = new PlayerBetweenTurnEvent(super.player, m.getPlayers().get(index));
        MatchDLO.applyEvent(m, pste);
    }

    @Override
    public String logMessage() {
        return "Finishing " + super.player.getPlayer().getDisplayName() + "'s Turn.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
