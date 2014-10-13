/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffectDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class MatchCardDLO {

    public static void resetGameVariables(MatchCard card) {
        card.setNumberOfUses(0);
        card.setPlayed(false);
    }

    public static MatchCard createMatchCard(Match m, MatchPlayer p, InstancedCard card) {
        MatchCard matchCard = null;
        if (card != null) {
            matchCard = new MatchCard();
            matchCard.setAlternativeArt(card.getAlternativeArt());
            matchCard.setFoil(card.getFoil());
            matchCard.setOfferTrade(false);
            matchCard.setTradeable(false);
            matchCard.setOwner(p.getPlayer());
            matchCard.setSourceCard(card.getSourceCard());
            matchCard.setSpecularMapPath(card.getSpecularMapPath());
            matchCard.setTexturePath(card.getTexturePath());
            GenericCardEffectDLO.setCardEffect(matchCard, card);

            resetGameVariables(matchCard);
        }
        return matchCard;
    }
}
