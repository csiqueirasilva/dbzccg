/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

import java.util.EnumSet;

/**
 *
 * @author csiqueira
 */
public enum PersonalityType {
    GOKU,
    NAPPA,
    VEGETA,
    RADITZ,
    GOHAN,
    PICCOLO,
    CHIAOTZU,
    TIEN,
    KRILLIN,
    YAMCHA,
    YAJIROBE,
    BULMA,
    CHICHI,
    SAIBAIMEN,
    ROSHI,
    BABA,
    KING_KAI,
    DREAM_SAIYAN_1,
    DREAM_SAIYAN_2,
    GIANT_ALIEN_INSECT,
    RED_ASSISTANT_DEMON_WITH_GLASSES,
    T_REX,
    BUBBLES,
    GREGORY,
    BLUE_DEMON_GUARD,
    OX_KING,
    TURTLE,
    POPO;
    
    public static final EnumSet<PersonalityType> femaleList = EnumSet.of(BABA, BULMA, CHICHI);
    public static final EnumSet<PersonalityType> saiyanHeritage = EnumSet.of(GOKU, GOHAN, VEGETA, NAPPA, RADITZ);
    public static final EnumSet<PersonalityType> namekianHeritage = EnumSet.of(PICCOLO);
    
    public static String jsVar = "DBZCCG.Personality.Personalities";
    public static String jsEnumSetParent = "DBZCCG.Personality";
}