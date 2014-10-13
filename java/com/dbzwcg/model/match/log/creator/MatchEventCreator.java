/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.log.creator;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@SequenceGenerator(name = MatchEventCreator.SEQUENCE_NAME, sequenceName = MatchEventCreator.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class MatchEventCreator implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column
    private Integer id;
    
    public final static String SEQUENCE_NAME = "seq_match_event_creator";
    
    abstract public String getName();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}