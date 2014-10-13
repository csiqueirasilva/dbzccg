/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.mainpersonality;

import com.dbzwcg.model.match.personality.MatchPersonality;
import javax.persistence.Column;
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
public class MatchMainPersonality extends MatchPersonality {
    @Column
    protected Integer alignment;
    
    @Column
    protected Integer currentAngerLevel;

    public Integer getCurrentAngerLevel() {
        return currentAngerLevel;
    }

    public void setCurrentAngerLevel(Integer currentAngerLevel) {
        this.currentAngerLevel = currentAngerLevel;
    }
    private Integer angerLevelNeededToLevel;
    
    public Integer getAlignment() {
        return alignment;
    }

    public void setAlignment(Integer alignment) {
        this.alignment = alignment;
    }

    public Integer getAngerLevelNeededToLevel() {
        return angerLevelNeededToLevel;
    }

    public void setAngerLevelNeededToLevel(Integer angerLevelNeededToLevel) {
        this.angerLevelNeededToLevel = angerLevelNeededToLevel;
    }
}
