/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.play;

import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;

/**
 *
 * @author csiqueira
 */
public class MoveCardMechanicDLO {

    public static MoveCardMechanic transferBottomCard(MatchCardGroup source, MatchCardGroup target) {

        MoveCardMechanic mcm = null;

        try {
            MatchCard card = source.get(0);
            mcm = new MoveCardMechanic(card, target, source);
        } catch (ArrayIndexOutOfBoundsException e) {
            
        }
        
        return mcm;
    }
}
