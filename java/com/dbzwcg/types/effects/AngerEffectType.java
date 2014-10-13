/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum AngerEffectType {
    RAISE(0x000000),
    LOWER(0x000001),
    SET(0x000002);

    private int value;

    private AngerEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect.Anger";
    public static String dbPrefix = "ANGER_";
}