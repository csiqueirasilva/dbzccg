/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.decks;

import com.dbzwcg.types.CollectionType;
import java.util.Map;

/**
 *
 * @author csiqueira
 */
public class DeckEligibleReference {
    private Deck deck;
    private Map<CollectionType, Boolean> eligible;

    public Deck getDeck() {
        return this.deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public Map<CollectionType, Boolean> getEligible() {
        return eligible;
    }

    public void setEligible(Map<CollectionType, Boolean> eligible) {
        this.eligible = eligible;
    }
}
