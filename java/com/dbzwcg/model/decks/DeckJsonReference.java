/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.decks;

import java.util.List;

/**
 *
 * @author csiqueira
 */
public class DeckJsonReference {
    private List<CardInDeckJsonReference> mainPersonality;

    public List<CardInDeckJsonReference> getMainPersonality() {
        return this.mainPersonality;
    }

    public void setMainPersonality(List<CardInDeckJsonReference> mainPersonality) {
        this.mainPersonality = mainPersonality;
    }
    
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<CardInDeckJsonReference> getCards() {
        return cards;
    }

    public void setCards(List<CardInDeckJsonReference> cards) {
        this.cards = cards;
    }

    public Integer getAlignment() {
        return alignment;
    }

    public void setAlignment(Integer alignment) {
        this.alignment = alignment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    private List<CardInDeckJsonReference> cards;
    private Integer alignment;
    private String name;
}
