/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.gamemechanics;

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
@Table
@Entity
@SequenceGenerator(name = GameMechanic.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class GameMechanic implements Serializable {

    @Id
    @Column
    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
    private Long id;
    
    public final static String SEQUENCE_NAME = "seq_game_mechanic";
    
    abstract public String getName();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }    
}