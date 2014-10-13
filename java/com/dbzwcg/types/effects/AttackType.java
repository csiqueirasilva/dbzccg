/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types.effects;

/**
 *
 * @author csiqueira
 */
public enum AttackType {
    PHYSICAL(0x100000),
    ENERGY(0x100001);
    
    private final int value;

    private AttackType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Combat.Attack";
    public static String dbPrefix = "ATTACK_";
}