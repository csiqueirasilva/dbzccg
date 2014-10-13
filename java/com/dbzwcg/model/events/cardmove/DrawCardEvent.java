/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardmove;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class DrawCardEvent extends CardMoveEvent {

    protected Boolean privateDraw;

    public DrawCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic) {
        super(source, player, cardMechanic);
        this.privateDraw = false;
    }

    public DrawCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Boolean privateDraw) {
        super(source, player, cardMechanic);
        this.privateDraw = privateDraw;
    }

    public DrawCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Integer targetIndex) {
        super(source, player, cardMechanic, targetIndex);
        this.privateDraw = false;
    }

    public DrawCardEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Integer targetIndex, Boolean privateDraw) {
        super(source, player, cardMechanic, targetIndex);
        this.privateDraw = privateDraw;
    }

    @Override
    public String logMessage() {
        String msg;
        if (!this.privateDraw) {
            msg = super.player.getPlayer().getDisplayName() + " drew " + super.getSource().getCard().getSourceCard().getName() + " from the "
                    + MatchCardGroupDLO.getReadableName(super.getSource().getField())
                    + " due to the effects of " + ((GameMechanic) this.getSourceRawObject()).getName() + ".";
        } else {
            msg = super.player.getPlayer().getDisplayName() + " drew a card from the "
                    + MatchCardGroupDLO.getReadableName(super.getSource().getField())
                    + " due to the effects of " + ((GameMechanic) this.getSourceRawObject()).getName() + ".";
        }
        return msg;
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("NYI");
    }
}
