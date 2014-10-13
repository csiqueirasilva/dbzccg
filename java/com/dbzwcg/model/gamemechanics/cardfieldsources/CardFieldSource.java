/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics.cardfieldsources;

import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.types.CardFieldType;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 *
 * @author csiqueira
 */
@Embeddable
public class CardFieldSource implements Serializable {

    @Column
    private CardFieldType field;
    
    @OneToOne
    @JoinColumn
    private MatchCard card;
    
    @Column
    private Integer index;

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public CardFieldType getField() {
        return field;
    }

    public void setField(CardFieldType field) {
        this.field = field;
    }

    public MatchCard getCard() {
        return card;
    }

    public void setCard(MatchCard card) {
        this.card = card;
    }
    
    public static Boolean validate (CardFieldSource cfs) {
        return cfs != null && cfs.getField() != null && (cfs.getCard() != null || cfs.getIndex() != null);
    }
}