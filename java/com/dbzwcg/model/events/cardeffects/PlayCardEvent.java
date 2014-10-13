/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardeffects;

import com.dbzwcg.model.events.cardmove.CardMoveEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class PlayCardEvent extends CardMoveEvent {

    protected final MatchCard card;

    public MatchCard getCard() {
        return card;
    }
    
    public PlayCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic) {
        super(source, player, cardMechanic);
        this.card = cardMechanic.getCardMoved();
    }

    public PlayCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Integer targetIndex) {
        super(source, player, cardMechanic, targetIndex);
        this.card = cardMechanic.getCardMoved();
    }

    @Override
    public void phaseEffect (Match m) {
        super.phaseEffect(m);
        this.card.setPlayed(true);
        
        PlayCardEffectEvent paee = new PlayCardEffectEvent(super.getSource().getCard().getEffect(), super.player);
        MatchDLO.applyInterruptedEvent(m, paee);
    }
    
    @Override
    public String logMessage () {
        return "Placing card into play - " + super.getSource().getCard().getSourceCard().getName();
    }
}
