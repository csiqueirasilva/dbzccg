/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum CollectionType {
    COLLECTIBLE_CARD_GAME("CCG");
    
    private String value;
    
    private CollectionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Card.Collection";
}
