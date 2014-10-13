package com.dbzwcg.model.decks;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.model.users.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author csiqueira
 */
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@jid")
@Entity
@SequenceGenerator(name = Deck.DECK_SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
public class Deck implements Serializable {

    public static final String DECK_SEQUENCE_NAME = "SEQ_DECKS";
    
    @Column
    protected String displayName;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    protected List<InstancedCard> cards;
    
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn
    protected User owner;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = DECK_SEQUENCE_NAME)
    @Column
    protected Integer id;
    
    @Enumerated(EnumType.STRING)
    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    protected AlignmentType alignment;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    protected List<InstancedCard> mainPersonality;
    
    public AlignmentType getAlignment() {
        return this.alignment;
    }

    public void setAlignment(AlignmentType alingment) {
        this.alignment = alingment;
    }

    public List<InstancedCard> getMainPersonality() {
        return this.mainPersonality;
    }
    
    public void setMainPersonality(List<InstancedCard> mainPersonality) {
        this.mainPersonality = mainPersonality;
    }
    
    public List<InstancedCard> getCards() {
        return this.cards;
    }

    public void setCards(List<InstancedCard> cards) {
        this.cards = cards;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDisplayName() {
        return this.displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}