/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.physicaltables;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
public class CCGSaiyanSagaPhysicalAttackTable extends PhysicalAttackTable {
    @Override
    protected Integer getDamage(Integer powerStage) {
        Integer ret;

        if (powerStage == 0) {
            ret = 1;
        } else if (powerStage > 0 && powerStage <= 500) {
            ret = 2;
        } else if (powerStage > 500 && powerStage <= 900) {
            ret = 3;
        } else if (powerStage > 900 && powerStage <= 2900) {
            ret = 4;
        } else if (powerStage > 2900 && powerStage <= 9900) {
            ret = 5;
        } else if (powerStage > 9900 && powerStage <= 14900) {
            ret = 6;
        } else if (powerStage > 14900 && powerStage <= 24900) {
            ret = 7;
        } else {
            ret = 8;
        }

        return ret;
    }
}