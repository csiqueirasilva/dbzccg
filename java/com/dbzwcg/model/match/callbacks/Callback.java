/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.callbacks.sets.CallbackSet;
import com.dbzwcg.model.match.log.MatchEvent;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@SequenceGenerator(name = Callback.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Callback implements Comparable<Callback>, Serializable {

    public final static String SEQUENCE_NAME = "seq_callback";
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column
    private Long id;

    @Column
    protected Integer priority;

    @Column
    protected Integer life;

    @ManyToOne
    @JoinColumn
    protected CallbackSet callbackSet;

    public CallbackSet getCallbackSet() {
        return callbackSet;
    }

    public void setCallbackSet(CallbackSet callbackSet) {
        this.callbackSet = callbackSet;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getLife() {
        return life;
    }

    public void setLife(Integer life) {
        this.life = life;
    }

    @Override
    public int compareTo(Callback o) {
        return this.priority - o.priority;
    }
    
    public abstract CallbackReturn exec(Match m, MatchEvent e);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}