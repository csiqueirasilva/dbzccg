/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.sagas;

import com.dbzwcg.types.CollectionType;

/**
 *
 * @author csiqueira
 */
public enum CollectibleCardGameSagaType {
    SAIYAN(0x000000);
    
    private int value;

    private CollectibleCardGameSagaType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static CollectionType collection = CollectionType.COLLECTIBLE_CARD_GAME;
    public static String jsVar = "DBZCCG.Card.Saga['Collectible Card Game']";
    public static String dbPrefix = "CCG_";
}