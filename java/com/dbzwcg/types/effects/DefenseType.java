/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum DefenseType {
    PHYSICAL(0x400000),
    ENERGY(0x400001),
    DEFENSE_SHIELD(0x400002),
    PREVENTION(0x400003),
    OMNI(0x400004),
    ALL(0x400005);
    
    private int value;

    private DefenseType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Defense";
    public static String dbPrefix = "DEFENSE_";
}