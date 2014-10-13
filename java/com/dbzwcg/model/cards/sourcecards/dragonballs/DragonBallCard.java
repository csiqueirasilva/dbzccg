package com.dbzwcg.model.cards.sourcecards.dragonballs;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.types.DragonBallType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table
@PrimaryKeyJoinColumn
public class DragonBallCard extends SourceCard {

    @JsonSerialize(using=EnumJsonSerializer.class)
    @Column
    @Enumerated(EnumType.STRING)
    protected DragonBallType dbCode;

    public DragonBallType getDbCode() {
        return dbCode;
    }

    public void setDbCode(DragonBallType dbCode) {
        this.dbCode = dbCode;
    }
}