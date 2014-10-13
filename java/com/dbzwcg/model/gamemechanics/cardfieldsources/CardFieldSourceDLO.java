/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.cardfieldsources;

import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class CardFieldSourceDLO {

    public static MatchCardGroup getGroupFromSource(MatchPlayer player, CardFieldSource source) {
        MatchCardGroup mcg = null;

        if (CardFieldSource.validate(source)) {
            switch (source.getField()) {
                case inPlay:
                    mcg = player.getInPlay();
                    break;
                case dragonballs:
                    mcg = player.getDragonballs();
                    break;
                case discardPile:
                    mcg = player.getDiscardPile();
                    break;
                case hand:
                    mcg = player.getHand();
                    break;
                case lifeDeck:
                    mcg = player.getLifeDeck();
                    break;
                case nonCombats:
                    mcg = player.getNonCombats();
                    break;
                case removedFromTheGame:
                    mcg = player.getRemovedFromTheGame();
                    break;
            }
        }

        return mcg;
    }
}
