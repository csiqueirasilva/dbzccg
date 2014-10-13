/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.cardgroup;

import com.dbzwcg.model.events.cardmove.CardMoveEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.types.CardFieldType;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */

@Entity
@SequenceGenerator(name = MatchCardGroup.SEQUENCE_NAME, sequenceName = MatchCardGroup.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
public class MatchCardGroup extends ArrayList<MatchCard> {

    public final static String SEQUENCE_NAME = "seq_match_card_group"; 
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column(name = "id")
    protected Integer id;
    
    @JsonSerialize(using=IdValueJsonSerializer.class)
    @JoinColumn
    @ManyToOne(fetch = FetchType.EAGER)
    protected MatchPlayer owner;
    
    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Convert(converter = EnumTools.DatabaseConverter.class)
    protected CardFieldType fieldType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MatchCardGroup() {
    }

    public MatchCardGroup(List<MatchCard> list) {
        super(list);
    }

    public CardFieldType getFieldType() {
        return fieldType;
    }

    public void setFieldType(CardFieldType fieldType) {
        this.fieldType = fieldType;
    }

    public MatchPlayer getOwner() {
        return owner;
    }

    public void setOwner(MatchPlayer owner) {
        this.owner = owner;
    }

    public Boolean insertCardByIdx(Match m, MatchPlayer p, MatchCard card, CardMoveEvent event) {
        this.add(event.getTarget().getIndex(), card);
        card.setGroup(this);
        return true;
    }

    public MatchCard removeCardByIdx(Match m, MatchPlayer p, CardMoveEvent event) {
        MatchCard ic = null;

        try {
            ic = this.get(event.getSource().getIndex());
            this.remove(ic);
        } catch (IndexOutOfBoundsException e) {
            if (this.fieldType == CardFieldType.lifeDeck) {
                MatchDLO.lifeCardGameOver(m, p);
            }
        }

        return ic;
    }
}