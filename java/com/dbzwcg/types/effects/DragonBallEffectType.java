/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum DragonBallEffectType {
    CAPTURE(0x500000),
    EARTH_DRAGON_BALL(0x500001);
    
    private int value;

    private DragonBallEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect.DragonBalls";
    public static String dbPrefix = "DRAGONBALL_";
}
