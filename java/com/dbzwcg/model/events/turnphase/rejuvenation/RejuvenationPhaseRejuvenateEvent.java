/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.rejuvenation;

import com.dbzwcg.model.events.cardmove.CardMoveEvent;
import com.dbzwcg.model.events.cardmove.failures.MatchCardGroupOutOfCardsEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.rejuvenation.RejuvenationPhase;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class RejuvenationPhaseRejuvenateEvent extends MatchEvent {

    public RejuvenationPhaseRejuvenateEvent(GameMechanic gameMechanic, MatchPlayer target) {
        super(gameMechanic, target);
        super.player = target;
        super.nextEvent = AfterRejuvenationPhaseEvent.class;
        super.displayableToUser = true;
    }

    private void rejuvenate(Match m, RejuvenationPhase rejuvenationPhase) throws NullPointerException {
        MatchCard card = super.player.getDiscardPile().get(super.player.getDiscardPile().size() - 1);
        MoveCardMechanic mcm = new MoveCardMechanic(card, super.player.getLifeDeck(), super.player.getDiscardPile());
        CardMoveEvent rejuvenationCardEvent = new CardMoveEvent(rejuvenationPhase, super.player, mcm, 0);
        MatchDLO.applyEvent(m, rejuvenationCardEvent);
    }

    @Override
    protected void phaseEffect(Match m) {
        RejuvenationPhase rejuvenationPhase = (RejuvenationPhase) this.getSourceRawObject();

        try {
            this.rejuvenate(m, rejuvenationPhase);
            rejuvenationPhase.setRejuvenated(true);
        } catch (NullPointerException e) {
            MatchCardGroupOutOfCardsEvent mcge = new MatchCardGroupOutOfCardsEvent(rejuvenationPhase, super.player, super.player.getDiscardPile());
            MatchDLO.applyEvent(m, mcge);
            rejuvenationPhase.setRejuvenated(false);
        }
        m.setWaitingExternalInteraction(false);
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + " decides to rejuvenate.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
