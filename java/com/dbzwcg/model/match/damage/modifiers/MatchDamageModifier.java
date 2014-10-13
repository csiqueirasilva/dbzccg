/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.damage.modifiers;

import com.dbzwcg.model.match.damage.MatchDamage;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

/**
 *
 * @author csiqueira
 */
@Embeddable
public class MatchDamageModifier implements Comparable<MatchDamageModifier>, Serializable {

    @Column
    protected Integer priority;

    @Embedded
    protected MatchDamage modifier;

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public MatchDamage getModifier() {
        return modifier;
    }

    public void setModifier(MatchDamage modifier) {
        this.modifier = modifier;
    }

    @Override
    public int compareTo(MatchDamageModifier o) {
        return this.priority - o.priority;
    }
}
