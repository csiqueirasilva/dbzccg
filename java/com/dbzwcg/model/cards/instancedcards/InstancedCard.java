/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.instancedcards;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.dbzwcg.types.FoilType;
import com.dbzwcg.model.users.user.User;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@SequenceGenerator(name = InstancedCard.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public class InstancedCard implements Serializable {

    public final static String SEQUENCE_NAME = "seq_instance_cards";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column
    protected Integer id;

    @Column
    protected String texturePath;

    @JsonSerialize(using = IdValueJsonSerializer.class)
    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(nullable = false)
    protected SourceCard sourceCard;

    @JsonSerialize(using = EnumJsonSerializer.class)
    @Column
    protected FoilType foil;

    @Column
    protected Boolean alternativeArt;

    @Column
    protected String specularMapPath;

    @Column
    protected Boolean offerTrade;

    @JsonSerialize(using = IdValueJsonSerializer.class)
    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(nullable = false)
    protected User owner;

    @Column
    protected Boolean tradeable;

    public SourceCard getSourceCard() {
        return this.sourceCard;
    }

    public void setSourceCard(SourceCard sourceCard) {
        this.sourceCard = sourceCard;
    }

    public Boolean getTradeable() {
        return tradeable;
    }

    public void setTradeable(Boolean tradeable) {
        this.tradeable = tradeable;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTexturePath() {
        return texturePath;
    }

    public void setTexturePath(String texturePath) {
        this.texturePath = texturePath;
    }

    public FoilType getFoil() {
        return foil;
    }

    public void setFoil(FoilType foil) {
        this.foil = foil;
    }

    public Boolean getAlternativeArt() {
        return alternativeArt;
    }

    public void setAlternativeArt(Boolean alternativeArt) {
        this.alternativeArt = alternativeArt;
    }

    public String getSpecularMapPath() {
        return specularMapPath;
    }

    public void setSpecularMapPath(String specularMapPath) {
        this.specularMapPath = specularMapPath;
    }

    public Boolean getOfferTrade() {
        return offerTrade;
    }

    public void setOfferTrade(Boolean offerTrade) {
        this.offerTrade = offerTrade;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
