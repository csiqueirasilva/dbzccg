/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.generics;

import com.dbzwcg.model.events.cardeffects.CardActivateEffectEvent;
import com.dbzwcg.model.events.cardmove.DiscardCardEvent;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.GameEffect;
import com.dbzwcg.model.match.card.effects.costs.MatchCost;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.types.CardFieldType;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class GenericCardEffect extends GameEffect {

    @Transient
    protected List<MatchCost> cost;
    @Transient
    protected CardFieldType targetGroupAfterUse;
    @Transient
    protected CardFieldType sourceGroupAfterUse;

    public abstract void postEffect(Match m, MatchPlayer p);

    public abstract void playEffect(Match m, MatchPlayer p);

    public abstract Boolean playable(Match m, MatchPlayer p);

    @JsonSerialize(using = IdValueJsonSerializer.class)
    @OneToOne(cascade = CascadeType.ALL, optional = false, mappedBy = "effect", orphanRemoval = true)
    @JoinColumn
    private MatchCard card;

    public MatchCard getCard() {
        return card;
    }

    public void setCard(MatchCard card) {
        this.card = card;
    }

    @Override
    public String getName() {
        return "Card Effect";
    }

    public List<MatchCost> getCost(Match m, MatchPlayer p) {
        return this.cost;
    }

    public void afterEffect(Match m, MatchPlayer p) {
        if (this.targetGroupAfterUse != null && this.sourceGroupAfterUse != null) {
            MatchCardGroup target = MatchCardGroupDLO.getCardGroupByType(p, this.targetGroupAfterUse);
            MatchCardGroup source = MatchCardGroupDLO.getCardGroupByType(p, this.sourceGroupAfterUse);

            MoveCardMechanic mcm = new MoveCardMechanic(this.getCard(), target, source);
            DiscardCardEvent dce = new DiscardCardEvent(this, p, mcm);
            MatchDLO.applyInterruptedEvent(m, dce);
        }
    }

    public void play(Match m, MatchPlayer p) {
        MatchEvent event = new CardActivateEffectEvent(this, p);
        MatchDLO.applyInterruptedEvent(m, event);
    }

}
