/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.damage.lifecard;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.events.cardmove.CardMoveEvent;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.CardType;

/**
 *
 * @author csiqueira
 */
public class DropLifeCardDamageEvent extends CardMoveEvent {

    private final MatchDamage sourceDamage;
    private final MatchDamage counterDamage;
    private Integer lifeCardIndex;

    public MatchDamage getSourceDamage() {
        return sourceDamage;
    }

    public MatchDamage getCounterDamage() {
        return counterDamage;
    }

    public void setLifeCardIndex(Integer lifeCardIndex) {
        this.lifeCardIndex = lifeCardIndex;
    }

    public Integer getLifeCardIndex() {
        return lifeCardIndex;
    }

    private DropLifeCardDamageEvent(GenericCardEffect matchCardEffect, MatchPlayer player, MoveCardMechanic mcm, MatchDamage damage, MatchDamage counterDamage, Integer lifeCardIndex) {
        super(matchCardEffect, player, mcm);
        this.sourceDamage = damage;
        this.counterDamage = counterDamage;
        this.counterDamage.setCards(this.counterDamage.getCards() + 1);
        this.lifeCardIndex = lifeCardIndex;
    }

    public void requeue(Match m) {
        DropLifeCardDamageEvent dlcde = createDropLifeCardDamageEvent(this.lifeCardIndex - 1, (GenericCardEffect) super.getSourceRawObject(), super.player, this.sourceDamage, this.counterDamage);
        MatchDLO.applyInterruptedEvent(m, dlcde);
    }

    public static DropLifeCardDamageEvent createDropLifeCardDamageEvent(Integer lifeCardIndex, GenericCardEffect matchCardEffect, MatchPlayer player, MatchDamage damage, MatchDamage counterDamage) {
        MoveCardMechanic mcm = new MoveCardMechanic(player.getLifeDeck().get(player.getLifeDeck().size() - 1), player.getDiscardPile(), player.getLifeDeck());
        return new DropLifeCardDamageEvent(matchCardEffect, player, mcm, damage, counterDamage, lifeCardIndex);
    }

    @Override
    protected void phaseEffect(Match m) {
        super.phaseEffect(m);

        SourceCard card = super.getSource().getCard().getSourceCard();

        if (card.getType().contains(CardType.DRAGONBALL)) {

        } /* else if endurance {} */

        CalculateLifeCardDamageEvent clcde = new CalculateLifeCardDamageEvent((GenericCardEffect) super.getSourceRawObject(), super.player, card, this);
        MatchDLO.applyInterruptedEvent(m, clcde);
    }

    @Override
    public String logMessage() {
        return "DROP LIFE DAMAGE CARD EVENT - " + super.getSource().getCard().getSourceCard().getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
