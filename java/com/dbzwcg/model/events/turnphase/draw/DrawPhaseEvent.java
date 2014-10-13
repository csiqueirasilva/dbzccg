/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.draw;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.draw.DrawPhase;

/**
 *
 * @author csiqueira
 */
public class DrawPhaseEvent extends MatchEvent {

    public DrawPhaseEvent(GameMechanic gameMechanic, MatchPlayer target) {
        super(gameMechanic, target);
        super.player = target;
        super.nextEvent = AfterDrawPhaseEvent.class;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        DrawPhase phase = (DrawPhase) m.getCurrentPhase();
        MatchCardGroupDLO.topDrawEventFromMatchCardGroup(phase, m,
                super.player.getLifeDeck(),
                super.player,
                super.player.getDrawPhaseQuantityDraw()
        );
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s Draw Phase.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
