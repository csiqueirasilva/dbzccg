/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.generics;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.events.cardeffects.PlayCardEffectEvent;
import com.dbzwcg.model.events.cardeffects.PlayCardEvent;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class GenericCardEffectDLO {

    public static void setCardEffect(MatchCard matchCard, InstancedCard card) {
        GenericCardEffect mce = GenericCardEffectDLO.getEffect(card);
        mce.setCard(matchCard);
        matchCard.setEffect(mce);
    }

    public static GenericCardEffect getEffect(InstancedCard card) {
        SourceCard source = card.getSourceCard();
        String collection = source.getCollectionType().getValue().toLowerCase();
        String saga = source.getSaga().toString().toLowerCase();
        String number = source.getNumber().toLowerCase();
        String classPath = "com.dbzwcg.match.card." + collection + "." + saga + ".C" + number;

        GenericCardEffect mce = null;

        try {
            mce = (GenericCardEffect) Class.forName(classPath).newInstance();
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException e) {
            System.out.println("ERROR CLASS CREATION ERROR: " + classPath);
            System.exit(1);
        }

        return mce;
    }

    public static void putCardInPlay(GenericCardEffect effect, Match m, MatchPlayer p, MatchCardGroup source) {
        MatchEvent event;
        if (!effect.getCard().getPlayed()) {
            if (source != null) {
                MoveCardMechanic mcm = new MoveCardMechanic(effect.getCard(),
                        MatchCardGroupDLO.getTargetGroupByCardType(effect.getCard(), p),
                        source);
                event = new PlayCardEvent(effect, p, mcm);
            } else {
                effect.getCard().setPlayed(true);
                event = new PlayCardEffectEvent(effect, p);
            }

            MatchDLO.applyInterruptedEvent(m, event);
        }

    }

}
