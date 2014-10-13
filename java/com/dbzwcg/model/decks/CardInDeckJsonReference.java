/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.decks;

import com.dbzwcg.types.FoilType;

/**
 *
 * @author csiqueira
 */
public class CardInDeckJsonReference {
    private Boolean proxy;

    public Boolean getProxy() {
        return proxy;
    }

    public void setProxy(Boolean proxy) {
        this.proxy = proxy;
    }
    
    private Integer qtt;

    public Integer getQtt() {
        return qtt;
    }

    public void setQtt(Integer qtt) {
        this.qtt = qtt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public FoilType getFoil() {
        return foil;
    }

    public void setFoil(FoilType foil) {
        this.foil = foil;
    }
    private Integer id;
    private FoilType foil;
}