/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.physicaltables;

/**
 *
 * @author csiqueira
 */
public enum SpecialTypesPowerStagesCompareValue {
    Z_DEFENDING(2),
    Z_ATTACKING(2);
    
    private Integer value;
    
    private SpecialTypesPowerStagesCompareValue (Integer val) {
        this.value = val;
    }
    
    public Integer getValue() {
        return this.value;
    }
}