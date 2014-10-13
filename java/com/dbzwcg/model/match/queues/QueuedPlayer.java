/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.queues;

import com.dbzwcg.model.decks.Deck;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.types.PhysicalAttackTableType;
import java.util.Collection;

/**
 *
 * @author csiqueira
 */
public class QueuedPlayer {

    public static final Short MAX_NUMBER_OF_TRIES = 10;
    
    protected Collection<CollectionType> validCollections;
    protected Collection<MatchType> types;
    protected Player player;
    protected Deck deck;
    protected PhysicalAttackTableType pat;
    protected Short numberOfTries;

    public PhysicalAttackTableType getPat() {
        return pat;
    }

    public void setPat(PhysicalAttackTableType pat) {
        this.pat = pat;
    }
    
    public QueuedPlayer() {
        this.numberOfTries = 0;
    }
    
    public Short getNumberOfTries() {
        return numberOfTries;
    }

    public void setNumberOfTries(Short numberOfTries) {
        this.numberOfTries = numberOfTries;
    }

    public Collection<CollectionType> getValidCollections() {
        return validCollections;
    }

    public void setValidCollections(Collection<CollectionType> validCollections) {
        this.validCollections = validCollections;
    }

    public Collection<MatchType> getTypes() {
        return types;
    }

    public void setTypes(Collection<MatchType> types) {
        this.types = types;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public Deck getDeck() {
        return deck;
    }
}
