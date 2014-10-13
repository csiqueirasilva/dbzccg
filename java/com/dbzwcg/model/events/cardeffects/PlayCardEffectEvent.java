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
public class PlayCardEffectEvent extends MatchEvent {

    public PlayCardEffectEvent(GenericCardEffect effect, MatchPlayer player) {
        super(effect, player);
        super.player = player;
    }

    @Override
    protected void phaseEffect(Match m) {
        GenericCardEffect cardEffect = (GenericCardEffect) super.getSourceRawObject();
        cardEffect.play(m, super.player);
    }

    @Override
    public String logMessage() {
        return "Activating play card effect - " + ((GenericCardEffect) super.getSourceRawObject()).getCard().getSourceCard().getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
