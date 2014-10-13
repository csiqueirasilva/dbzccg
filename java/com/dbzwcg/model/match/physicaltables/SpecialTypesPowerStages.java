/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.physicaltables;

/**
 *
 * @author csiqueira
 */
public enum SpecialTypesPowerStages {
    Z("Z");
    
    private String value;

    private SpecialTypesPowerStages(String val) {
        this.value = val;
    }

    public String getValue() {
        return value;
    }
}
