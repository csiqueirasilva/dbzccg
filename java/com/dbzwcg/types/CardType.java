/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum CardType {
    PERSONALITY,
    NON$COMBAT,
    COMBAT,
    PHYSICAL_COMBAT,
    ENERGY_COMBAT,
    DRAGONBALL,
    MASTERY,
    BATTLEGROUND,
    LOCATION,
    SENSEI,
    FUSION,
    DRILL;
    
    public static String jsVar = "DBZCCG.Card.Type";
}
