/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum TargetEffectType {
    SELF(0x800001),
    ENEMY(0x800002),
    MULTIPLE(0x800003),
    SINGLE(0x800004);
    
    private int value;

    private TargetEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect.Target";
    public static String dbPrefix = "TARGET_";
}
