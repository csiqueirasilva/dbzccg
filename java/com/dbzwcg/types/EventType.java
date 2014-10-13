/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.types;

/**
 *
 * @author csiqueira
 */
public enum EventType {
    ENTERING_DRAW_PHASE,
    LEAVING_DRAW_PHASE,
    ENTERING_NON$COMBAT_PHASE,
    LEAVING_NON$COMBAT_PHASE,
    ENTERING_PUR_PHASE,
    LEAVING_PUR_PHASE,
    ENTERING_DECLARE_PHASE,
    LEAVING_DECLARE_PHASE,
    ENTERING_COMBAT_PHASE,
    LEAVING_COMBAT_PHASE,
    ENTERING_DISCARD_PHASE,
    LEAVING_DISCARD_PHASE,
    ENTERING_REJUVENATION_PHASE,
    LEAVING_REJUVENATION_PHASE,
    BEFORE_PLAYING,
    AFTER_PLAYING,
    BEFORE_ACTIVATING,
    AFTER_ACTIVATING,
    COMBAT_CHAIN_FINISHED;
    
    public static String jsVar = "DBZCCG.Combat.Events";
}