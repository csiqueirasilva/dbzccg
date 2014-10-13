/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardmove.failures;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.log.MatchEvent;

/**
 *
 * @author csiqueira
 */
public class FailedCardMoveDeniedByEffectEvent extends MatchEvent {

    public FailedCardMoveDeniedByEffectEvent(GameMechanic gameMechanic, MatchCard card) {
        super(gameMechanic, card);
        super.nextEvent = null;
    }
    
    @Override
    protected void phaseEffect(Match m) {
    }

    @Override
    public String logMessage() {
        return "Card Move failed due to the effects of " + ((GameMechanic) this.getSourceRawObject()).getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}