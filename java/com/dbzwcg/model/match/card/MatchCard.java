package com.dbzwcg.model.match.card;

import com.dbzwcg.model.cards.proxycards.ProxyCard;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.tools.objects.CollectionIdValueJsonSerializer;
import com.dbzwcg.tools.objects.IdValueJsonSerializer;
import com.dbzwcg.types.FoilType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class MatchCard extends ProxyCard {

    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    @JoinColumn
    protected GenericCardEffect effect;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    protected MatchCardGroup group;
    
    @JsonSerialize(using=IdValueJsonSerializer.class)
    @JoinColumn
    @ManyToOne
    protected MatchCard attachedTo;
    
    @JsonSerialize(using=CollectionIdValueJsonSerializer.class)
    @OneToMany(mappedBy = "attachedTo")
    protected List<MatchCard> attachedCards;

    /* Control variables, initialized after the card being played */
    @Column
    protected Boolean played;
    
    @Column
    protected Integer numberOfUses;
    
    @JoinColumn
    @JsonSerialize(using=IdValueJsonSerializer.class)
    @OneToOne(fetch = FetchType.EAGER)
    protected MatchPlayer control;
    
    @JoinColumn
    @JsonSerialize(using=IdValueJsonSerializer.class)
    @OneToOne( optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    protected MatchPlayer belongsTo;
    
    @Column
    protected Boolean successful;

    public MatchCardGroup getGroup() {
        return group;
    }

    public void setGroup(MatchCardGroup group) {
        this.group = group;
    }

    public MatchPlayer getBelongsTo() {
        return belongsTo;
    }

    public void setBelongsTo(MatchPlayer belongsTo) {
        this.belongsTo = belongsTo;
    }

    public MatchCard getAttachedTo() {
        return attachedTo;
    }

    public void setAttachedTo(MatchCard attachedTo) {
        this.attachedTo = attachedTo;
    }

    public List<MatchCard> getAttachedCards() {
        return attachedCards;
    }

    public void setAttachedCards(List<MatchCard> attachedCards) {
        this.attachedCards = attachedCards;
    }

    public Boolean getPlayed() {
        return played;
    }

    public void setPlayed(Boolean played) {
        this.played = played;
    }

    public Integer getNumberOfUses() {
        return numberOfUses;
    }

    public void setNumberOfUses(Integer numberOfUses) {
        this.numberOfUses = numberOfUses;
    }

    public MatchPlayer getControl() {
        return control;
    }

    public void setControl(MatchPlayer control) {
        this.control = control;
    }

    public Boolean getSuccessful() {
        return successful;
    }

    public void setSuccessful(Boolean successful) {
        this.successful = successful;
    }

    public GenericCardEffect getEffect() {
        return effect;
    }

    public void setEffect(GenericCardEffect effect) {
        this.effect = effect;
    }
    
    @Override
    public void setFoil(FoilType f) {
        this.foil = f;
    }
    
    @Override
    public void setTradeable(Boolean tradeable) {
        this.tradeable = tradeable;
    }
        
    @Override
    public void setOfferTrade(Boolean tradeable) {
        this.offerTrade = tradeable;
    }
    
    @Override
    public void setAlternativeArt(Boolean alternativeArt) {
        this.alternativeArt = alternativeArt;
    }
}
