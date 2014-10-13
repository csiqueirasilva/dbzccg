/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum StageEffectType {
    RAISE(0x700000),
    LOWER(0x700001),
    SET(0x700002);
    
    private int value;

    private StageEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect['Power Stages']";
    public static String dbPrefix = "STAGE_";
}
