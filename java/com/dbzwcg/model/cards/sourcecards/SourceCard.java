package com.dbzwcg.model.cards.sourcecards;

import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.tools.enums.CollectionEnumJsonSerializer;
import com.dbzwcg.types.CardType;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.PersonalityType;
import com.dbzwcg.types.RarityType;
import com.dbzwcg.types.StyleType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinTable;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@SequenceGenerator(name = SourceCard.SOURCE_CARD_SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
@Inheritance(strategy=InheritanceType.JOINED)
public class SourceCard implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SOURCE_CARD_SEQUENCE_NAME)
    @Column
    protected Integer id;

    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Convert(converter = EnumTools.DatabaseConverter.class)
    protected Enum saga;

    @Column
    protected String number;

    @Column(length = 600)
    protected String name;
    
    @Column(length = 10000)
    protected String description;
    
    @JsonSerialize(using=CollectionEnumJsonSerializer.class)
    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = CardType.class)
    @JoinTable
    protected Set<CardType> type;
    
    @JsonSerialize(using=CollectionEnumJsonSerializer.class)
    @Convert(converter = EnumTools.DatabaseConverter.class)
    @ElementCollection(targetClass = Enum.class)
    @JoinTable
    protected Set<Enum> effectTypes;
    
    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Enumerated(EnumType.STRING)
    protected RarityType rarity;
    
    @JsonSerialize(using=CollectionEnumJsonSerializer.class)
    @Convert(converter = EnumTools.DatabaseConverter.class)
    @ElementCollection(targetClass = Enum.class)
    @JoinTable
    protected Set<PersonalityType> personalities;
    
    @JsonSerialize(using=CollectionEnumJsonSerializer.class)
    @Convert(converter = EnumTools.DatabaseConverter.class)
    @ElementCollection(targetClass = Enum.class)
    @JoinTable
    protected Set<PersonalityType> headshots;
    
    @Column
    protected Integer cardLimit;

    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Enumerated(EnumType.STRING)
    protected StyleType style;

    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Enumerated(EnumType.STRING)
    protected CollectionType collectionType;
    
    public final static String SOURCE_CARD_SEQUENCE_NAME = "SEQ_SOURCE_CARDS";

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public CollectionType getCollectionType () {
        return this.collectionType;
    }

    public void setCollectionType (CollectionType c) {
        this.collectionType = c;
    }
    
    public Enum getSaga() {
        return this.saga;
    }

    public void setSaga(Enum saga) {
        try {
            this.collectionType = (CollectionType) saga.getClass().getField("collection").get(null);
            this.saga = saga;
        } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
            Logger.getLogger(SourceCard.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String getNumber() {
        return this.number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<CardType> getType() {
        return this.type;
    }

    public void setType(Set<CardType> type) {
        this.type = type;
    }

    public Set<Enum> getEffectTypes() {
        return this.effectTypes;
    }

    public void setEffectTypes(Set<Enum> effectTypes) {
        this.effectTypes = effectTypes;
    }

    public RarityType getRarity() {
        return this.rarity;
    }

    public void setRarity(RarityType rarity) {
        this.rarity = rarity;
    }

    public Set<PersonalityType> getPersonalities() {
        return this.personalities;
    }

    public void setPersonalities(Set<PersonalityType> personalities) {
        this.personalities = personalities;
    }

    public Set<PersonalityType> getHeadshots() {
        return this.headshots;
    }

    public void setHeadshots(Set<PersonalityType> headshots) {
        this.headshots = headshots;
    }

    public Integer getCardLimit() {
        return this.cardLimit;
    }

    public void setCardLimit(Integer limit) {
        this.cardLimit = limit;
    }

    public StyleType getStyle() {
        return this.style;
    }

    public void setStyle(StyleType style) {
        this.style = style;
    }
}