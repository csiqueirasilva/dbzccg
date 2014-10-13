/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum RarityType {
    COMMON,
    PROMO,
    UNCOMMON,
    FIXED,
    RARE,
    ULTRA_RARE,
    PREMIUM,
    UBBER_RARE;
    
    public static String jsVar = "DBZCCG.Card.Rarity";
}