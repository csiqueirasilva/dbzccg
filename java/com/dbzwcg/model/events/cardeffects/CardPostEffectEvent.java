/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardeffects;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class CardPostEffectEvent extends MatchEvent {

    public CardPostEffectEvent(GenericCardEffect gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        GenericCardEffect mce = (GenericCardEffect) this.getSourceRawObject();
        mce.postEffect(m, super.player);
    }

    @Override
    public String logMessage() {
        return "Activating success event - " + ((GenericCardEffect) super.getSourceRawObject()).getCard().getSourceCard().getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
