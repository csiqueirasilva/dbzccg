/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.log.creator;

import com.dbzwcg.model.match.card.MatchCard;
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
public class CardMatchEventCreator extends MatchEventCreator {

    @OneToOne( optional = false, cascade = CascadeType.ALL)
    @JoinColumn
    private MatchCard card;

    public MatchCard getCard() {
        return this.card;
    }

    public void setCard(MatchCard card) {
        this.card = card;
    }

    @Override
    public String getName() {
        return "Card Event Creator";
    }
}
