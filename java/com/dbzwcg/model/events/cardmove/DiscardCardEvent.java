/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardmove;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.MatchCardDLO;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DiscardCardEvent extends CardMoveEvent {

    protected final MatchCard card;

    public MatchCard getCard() {
        return card;
    }

    public DiscardCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic) {
        super(source, player, cardMechanic);
        this.card = cardMechanic.getCardMoved();
    }

    public DiscardCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Integer targetIndex) {
        super(source, player, cardMechanic, targetIndex);
        this.card = cardMechanic.getCardMoved();
    }

    @Override
    protected void phaseEffect(Match m) {
        super.phaseEffect(m);
        MatchCardDLO.resetGameVariables(this.card);
    }
    
    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + " discarted " + super.getSource().getCard().getSourceCard().getName() + " into the "
                + MatchCardGroupDLO.getReadableName(super.getTarget().getField())
                + " due to the effects of " + ((GameMechanic) this.getSourceRawObject()).getName() + ".";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("NYI");
    }
}
