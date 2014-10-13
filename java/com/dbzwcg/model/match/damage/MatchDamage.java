/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.damage;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
//@Entity
//@Table
//@SequenceGenerator(allocationSize = 1, initialValue = 1, name = MatchDamage.SEQUENCE_NAME, sequenceName = MatchDamage.SEQUENCE_NAME)
@Embeddable
public class MatchDamage implements Serializable {

//    public final static String SEQUENCE_NAME = "seq_match_damage";
//    
//    @Id
//    @Column
//    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
//    private Long id;

    @Column
    private Integer cards;

    @Column
    private Integer stages;

    public MatchDamage() {
        this.stages = this.cards = 0;
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public Integer getCards() {
        return cards;
    }

    public void setCards(Integer cards) {
        this.cards = cards;
    }

    public Integer getStages() {
        return stages;
    }

    public void setStages(Integer stages) {
        this.stages = stages;
    }
}