/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardeffects;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.log.creator.GameMechanicMatchEventCreator;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class CardActivateEffectEvent extends MatchEvent {

    public CardActivateEffectEvent(GenericCardEffect gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        GenericCardEffect mce = (GenericCardEffect) this.getSourceRawObject();
        mce.playEffect(m, super.player);
        MatchCard card = mce.getCard();
        Integer numberOfUses = card.getNumberOfUses();
        card.setNumberOfUses(numberOfUses + 1);
    }

    @Override
    public String logMessage() {
        GenericCardEffect mce = (GenericCardEffect) ((GameMechanicMatchEventCreator) super.getSourceActor()).getGameMechanic();
        return "Activating card effect - " + mce.getCard().getSourceCard().getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
    }
}
