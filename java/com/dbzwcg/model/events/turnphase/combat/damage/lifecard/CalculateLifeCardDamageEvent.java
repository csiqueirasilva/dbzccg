/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.events.turnphase.combat.damage.lifecard;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class CalculateLifeCardDamageEvent extends MatchEvent {

    private final SourceCard card;
    private final DropLifeCardDamageEvent dropEvent;

    public SourceCard getCard() {
        return card;
    }
    
    public CalculateLifeCardDamageEvent (GenericCardEffect attackEffect, MatchPlayer player, SourceCard card, DropLifeCardDamageEvent dropEvent) {
        super(attackEffect, player);
        this.card = card;
        this.dropEvent = dropEvent;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        if(!this.dropEvent.getLifeCardIndex().equals(1)) {
            this.dropEvent.requeue(m);
        }
    }

    @Override
    public String logMessage() {
        return "CALCULATE LIFE CARD DAMAGE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
