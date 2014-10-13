/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum CardEffectType {
    /* CARD EFFECTS */
    DRAW(0x200000),
    DISCARD(0x200001),
    REGENERATE(0x200002),
    SHUFFLE(0x200003);
    
    private int value;

    private CardEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect.Cards";
    public static String dbPrefix = "CARD_";
}