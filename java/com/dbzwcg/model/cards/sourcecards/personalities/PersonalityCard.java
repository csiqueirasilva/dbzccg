package com.dbzwcg.model.cards.sourcecards.personalities;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.types.AlignmentType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table
@PrimaryKeyJoinColumn
public class PersonalityCard extends SourceCard {

    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Enumerated(EnumType.STRING)
    protected AlignmentType alignment;

    public AlignmentType getAlignment() {
        return this.alignment;
    }

    public void setAlignment(AlignmentType alignment) {
        this.alignment = alignment;
    }

    @JoinTable
    @ElementCollection(targetClass = String.class)
    protected List<String> powerStages;

    public List<String> getPowerStages() {
        return this.powerStages;
    }

    public void setPowerStages(List<String> powerStages) {
        this.powerStages = powerStages;
    }
    
    @Column
    protected String PUR;

    public String getPUR() {
        return this.PUR;
    }

    public void setPUR(String PUR) {
        this.PUR = PUR;
    }

    @Column
    protected Integer personalityLevel;
    
    public Integer getPersonalityLevel() {
        return this.personalityLevel;
    }

    public void setPersonalityLevel(Integer level) {
        this.personalityLevel = level;
    }
}