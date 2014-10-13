/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardmove;


import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.cardfieldsources.CardFieldSource;
import com.dbzwcg.model.gamemechanics.cardfieldsources.CardFieldSourceDLO;
import com.dbzwcg.model.gamemechanics.play.MoveCardMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.types.CardFieldType;

/**
 *
 * @author csiqueira
 */
public class CardMoveEvent extends MatchEvent {

    protected CardFieldSource source;
    protected CardFieldSource target;

    public CardFieldSource getSource() {
        return source;
    }

    public void setSource(CardFieldSource source) {
        this.source = source;
    }

    public CardFieldSource getTarget() {
        return target;
    }

    public void setTarget(CardFieldSource target) {
        this.target = target;
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + " moves " + this.getSource().getCard().getSourceCard().getName() + " from "
                + MatchCardGroupDLO.getReadableName(this.getSource().getField())
                + " into " + MatchCardGroupDLO.getReadableName(this.getTarget().getField()) + " at position "
                + this.getTarget().getIndex() + ".";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    protected void phaseEffect(Match m) {
        if (CardFieldSource.validate(this.source) && CardFieldSource.validate(this.target)) {
            MatchCardGroup sourceGroup = CardFieldSourceDLO.getGroupFromSource(super.player, this.source);
            MatchCardGroup targetGroup = CardFieldSourceDLO.getGroupFromSource(super.player, this.target);

            MatchCard c = sourceGroup.removeCardByIdx(m, super.player, this);
            targetGroup.insertCardByIdx(m, super.player, (com.dbzwcg.model.match.card.MatchCard) c, this);
        }
    }

    public CardMoveEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic) {
        super(source, player);
        super.player = player;
        super.nextEvent = null;
        super.displayableToUser = true;
        this.source = new CardFieldSource();
        this.target = new CardFieldSource();

        MatchCard card = cardMechanic.getCardMoved();
        Integer idx = cardMechanic.getSourceGroup().indexOf(card);
        CardFieldType ft = cardMechanic.getSourceGroup().getFieldType();

        this.source.setCard(card);
        this.source.setField(ft);
        this.source.setIndex(idx);

        ft = cardMechanic.getTargetGroup().getFieldType();

        this.target.setIndex(cardMechanic.getTargetGroup().size());
        this.target.setField(ft);
    }

    public CardMoveEvent(GameMechanic source, MatchPlayer player, MoveCardMechanic cardMechanic, Integer targetIndex) {
        this(source, player, cardMechanic);
        this.target.setIndex(targetIndex);
    }
}