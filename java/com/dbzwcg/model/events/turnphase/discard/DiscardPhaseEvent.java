/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.discard;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.discard.DiscardPhase;
import com.dbzwcg.model.match.phase.discard.DiscardPhaseDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DiscardPhaseEvent extends MatchEvent {
    
    public DiscardPhaseEvent(GameMechanic gameMechanic, MatchPlayer target) {
        super(gameMechanic, target);
        super.player = target;
        super.nextEvent = null;
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        DiscardPhase discardPhase = (DiscardPhase) this.getSourceRawObject();
        discardPhase.setOwner(super.player);
        discardPhase.setPlayers(m.getPlayers());
        discardPhase.setCursor(super.player);
        DiscardPhaseDLO.playerDiscardPhase(m);
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s Discard Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
