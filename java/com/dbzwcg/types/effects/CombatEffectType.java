/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum CombatEffectType {
    /* COMBAT EFFECTS */
    FLOATING(0x300000),
    STRAINING_MOVE(0x300001),
    END_COMBAT(0x300002);
    
    private int value;

    private CombatEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect.Combat";
    public static String dbPrefix = "COMBAT_";
}