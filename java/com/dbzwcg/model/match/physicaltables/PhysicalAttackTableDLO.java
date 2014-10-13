/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.physicaltables;

import com.dbzwcg.types.PhysicalAttackTableType;

/**
 *
 * @author csiqueira
 */
public class PhysicalAttackTableDLO {
    public static PhysicalAttackTable getAttackTableFromType (PhysicalAttackTableType type) {
        PhysicalAttackTable pat = null;
        switch(type) {
            case SAIYAN_SAGA:
                pat = new CCGSaiyanSagaPhysicalAttackTable();
            break;
        }
        return pat;
    }
}
