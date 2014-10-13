/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum PhaseType {
    DRAW,
    NON$COMBAT,
    POWER_UP,
    DECLARE,
    COMBAT,
    DISCARD,
    REJUVENATION;
    
    public static String jsVar = "DBZCCG.Combat.PhaseTypes";
}