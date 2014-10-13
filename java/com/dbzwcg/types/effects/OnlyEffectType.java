/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum OnlyEffectType {
    SAIYAN(0x600000),
    NAMEKIAN(0x600001),
    HEROES(0x600002),
    VILLAINS(0x600003);
    
    private int value;

    private OnlyEffectType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Effect['Specific Personality']";
    public static String dbPrefix = "SPECIFIC_";
}