/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.events.cardeffects;

import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.List;

/**
 *
 * @author csiqueira
 */
public class PayCostsCardEvent extends MatchEvent {

    List<MatchCost> costs;
    
    public PayCostsCardEvent(GenericCardEffect effect, MatchPlayer player, List<MatchCost> costs) {
        super(effect, player);
        super.player = player;
        this.costs = costs;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        for(MatchCost cost : this.costs) {
            cost.payCost(m, super.player);
        }
        
        GenericCardEffect effect = (GenericCardEffect) this.getSourceRawObject();
        MatchCard card = effect.getCard();
        
        if(!card.getPlayed()) {
            MoveCardMechanic mcm = new MoveCardMechanic(card, MatchCardGroupDLO.getTargetGroupByCardType(card, super.player), 
                    MatchCardGroupDLO.getCardGroupByType(super.player, card.getGroup().getFieldType()));
            PlayCardEvent pce = new PlayCardEvent(effect, super.player, mcm);
            MatchDLO.applyInterruptedEvent(m, pce);
        }
    }

    @Override
    public String logMessage() {
        return "Paying costs for - " + ((GenericCardEffect) this.getSourceRawObject()).getCard().getSourceCard().getName();
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
