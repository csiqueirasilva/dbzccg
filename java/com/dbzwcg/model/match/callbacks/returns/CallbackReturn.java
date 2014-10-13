/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.returns;

import com.dbzwcg.model.gamemechanics.GameMechanic;

/**
 *
 * @author csiqueira
 */
public class CallbackReturn {
    private Boolean skipHookedEvent;
    private Boolean skipEventEffect;
    private GameMechanic mechanicNegator;

    public GameMechanic getMechanicNegator() {
        return mechanicNegator;
    }

    public void setMechanicNegator(GameMechanic mechanicNegator) {
        this.mechanicNegator = mechanicNegator;
    }
    
    public Boolean getSkipHookedEvent() {
        return skipHookedEvent;
    }

    public void setSkipHookedEvent(Boolean skipHookedEvent) {
        if(skipHookedEvent != null) {
            this.skipHookedEvent = skipHookedEvent;
        }
    }

    public Boolean getSkipEventEffect() {
        return skipEventEffect;
    }

    public void setSkipEventEffect(Boolean skipEventEffect) {
        if(skipEventEffect != null) {
            this.skipEventEffect = skipEventEffect;
        }
    }
    
    public CallbackReturn() {
        this.skipHookedEvent = false;
        this.skipEventEffect = false;
    }
}
