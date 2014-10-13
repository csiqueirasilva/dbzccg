/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.play;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
public class MoveCardMechanic extends GameMechanic {

    protected MoveCardMechanic() {
    }

    public MoveCardMechanic(MatchCard card, MatchCardGroup target, MatchCardGroup source) {
        this.targetGroup = target;
        this.cardMoved = card;
        this.sourceGroup = source;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn
    protected MatchCard cardMoved;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn
    protected MatchCardGroup targetGroup;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn
    protected MatchCardGroup sourceGroup;

    public MatchCard getCardMoved() {
        return cardMoved;
    }

    public void setCardMoved(MatchCard cardPlayed) {
        this.cardMoved = cardPlayed;
    }

    public MatchCardGroup getTargetGroup() {
        return targetGroup;
    }

    public void setTargetGroup(MatchCardGroup targetGroup) {
        this.targetGroup = targetGroup;
    }

    public MatchCardGroup getSourceGroup() {
        return sourceGroup;
    }

    public void setSourceGroup(MatchCardGroup sourceGroup) {
        this.sourceGroup = sourceGroup;
    }
    
    @Override
    public String getName() {
        return "Moving " + this.cardMoved.getSourceCard().getName();
    }
    
}
