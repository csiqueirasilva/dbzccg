/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.proxycards;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.types.FoilType;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@PrimaryKeyJoinColumn
@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public class ProxyCard extends InstancedCard implements Serializable {

    public ProxyCard() {
        this.foil = null;
        this.tradeable = false;
        this.offerTrade = false;
        this.alternativeArt = false;
    }
    
    @Override
    public void setFoil(FoilType f) {
    }
    
    @Override
    public void setTradeable(Boolean tradeable) {
    }
        
    @Override
    public void setOfferTrade(Boolean tradeable) {
    }
    
    @Override
    public void setAlternativeArt(Boolean alternativeArt) {
    }

}
