/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.cardgroup;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.events.cardmove.DrawCardEvent;
import com.dbzwcg.model.events.cardmove.failures.MatchCardGroupOutOfCardsEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.MatchCardDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.types.CardFieldType;
import com.dbzwcg.types.CardType;
import java.util.List;
import java.util.Set;

/**
 *
 * @author csiqueira
 */
public class MatchCardGroupDLO {

    public static MatchCardGroup getTargetGroupByCardType(MatchCard card, MatchPlayer player) {
        SourceCard c = card.getSourceCard();
        MatchCardGroup group = null;

        Set<CardType> types = c.getType();

        if (types.contains(CardType.PHYSICAL_COMBAT)
                || types.contains(CardType.ENERGY_COMBAT)
                || types.contains(CardType.COMBAT)) {
            group = player.getInPlay();
        } else if (types.contains(CardType.NON$COMBAT)) {
            group = player.getNonCombats();
        } else if (types.contains(CardType.DRAGONBALL)) {
            group = player.getDragonballs();
        }

        return group;
    }

    public static String getReadableName(CardFieldType field) {
        String ret = null;
        switch (field) {
            case discardPile:
                ret = "Discard Pile";
                break;
            case dragonballs:
                ret = "Dragonballs";
                break;
            case hand:
                ret = "Hand";
                break;
            case inPlay:
                ret = "Combats";
                break;
            case lifeDeck:
                ret = "Life Deck";
                break;
            case nonCombats:
                ret = "Non-Combats";
                break;
            case removedFromTheGame:
                ret = "Removed From The Game";
                break;
            case setAside:
                ret = "Set Aside";
                break;
            case mainPersonality:
                ret = "Main Personality";
        }
        return ret;
    }

    public static MatchCardGroup getCardGroupByType(MatchPlayer player, CardFieldType field) {
        MatchCardGroup ret = null;
        switch (field) {
            case discardPile:
                ret = player.getDiscardPile();
                break;
            case dragonballs:
                ret = player.getDragonballs();
                break;
            case hand:
                ret = player.getHand();
                break;
            case inPlay:
                ret = player.getInPlay();
                break;
            case lifeDeck:
                ret = player.getLifeDeck();
                break;
            case nonCombats:
                ret = player.getNonCombats();
                break;
            case removedFromTheGame:
                ret = player.getRemovedFromTheGame();
                break;
            case setAside:
                ret = player.getSetAside();
        }
        return ret;
    }

    public static Boolean bottomDrawEventFromMatchCardGroup(GameMechanic generator, Match m, MatchCardGroup mcg, MatchPlayer player, Integer quantity) {
        return drawCardFromIndex(generator, m, mcg, player, quantity, 0 - 1);
    }

    private static Boolean drawCardFromIndex(GameMechanic generator, Match m, MatchCardGroup mcg, MatchPlayer player, Integer quantity, Integer index) {
        Boolean noMoreCards = false;

        for (int i = 0; i < quantity && !noMoreCards; i++) {
            try {
                MatchCard card = player.getLifeDeck().get(index - i);
                MoveCardMechanic mcm = new MoveCardMechanic(card, player.getHand(), mcg);
                DrawCardEvent drawCardEvent = new DrawCardEvent(generator, player, mcm,
                        player.getHand().size() + i,
                        !player.getHandOnTable() || !(mcg.getFieldType() == CardFieldType.lifeDeck));
                MatchDLO.applyInterruptedEvent(m, drawCardEvent);
            } catch (ArrayIndexOutOfBoundsException e) {
                if (mcg.getFieldType() == CardFieldType.lifeDeck) {
                    MatchDLO.lifeCardGameOver(m, player);
                } else {
                    MatchCardGroupOutOfCardsEvent mcge = new MatchCardGroupOutOfCardsEvent(generator, player, mcg);
                    MatchDLO.applyInterruptedEvent(m, mcge);
                }
                noMoreCards = true;
            }
        }

        return noMoreCards;
    }

    public static Boolean topDrawEventFromMatchCardGroup(GameMechanic generator, Match m, MatchCardGroup mcg, MatchPlayer player, Integer quantity) {
        return drawCardFromIndex(generator, m, mcg, player, quantity, mcg.size() - 1);
    }

    public static MatchCardGroup createListMatchCard(Match m, List cards, MatchPlayer p, CardFieldType type) {
        MatchCardGroup list = null;
        if (cards != null) {
            list = new MatchCardGroup();
            InstancedCard card;
            MatchCard matchCard;
            list.setFieldType(type);
            list.setOwner(p);
            for (Object c : cards) {
                card = (InstancedCard) c;
                if (!(card instanceof MatchCard)) {
                    matchCard = MatchCardDLO.createMatchCard(m, p, card);
                } else {
                    matchCard = (MatchCard) card;
                }
                list.add(matchCard);
            }
        }
        return list;
    }
}
