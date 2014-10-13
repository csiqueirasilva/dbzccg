/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum LimitType {
    DECK_COPY_DEFAULT(3),
    DECK_COPY_SAME_PERSONALITY(4),
    DECK_COPY_LIMITED(1),
    DECK_COPY_RESTRICTED(1),
    DECK_MAX_DEFAULT_SIZE(85),
    DECK_MAX_NAMEKIAN_SIZE(90),
    DECK_MIN_DEFAULT_SIZE(50),
    LEVEL_MIN(1),
    LEVEL_MAX(5),
    LEVEL_QTT_MIN(3),
    LEVEL_QTT_MAX(5),
    DRAW_PHASE_QUANTITY_DEFAULT(3),
    MIN_POWER_STAGE(0),
    DISCARD_PHASE_LIMIT_DEFAULT(1),
    BEGINNING_POWER_STAGE(5),
    BEGINNING_ANGER_LEVEL(0),
    BEGINNING_MAIN_PERSONALITY_LEVEL(1),
    BEGINNING_ANGER_NEEDED_TO_LEVEL(5),
    BEGINNING_POWER_UP_RATING_MODIFIER(0),
    COMBAT_PHASE_DEFENDER_QUANTITY_DEFAULT(3),
    LEVEL_DOWN_POWER_STAGE_SET(5);

    private int value;
    
    private LimitType(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
    
    public static String jsVar = "DBZCCG.Limits";
}