/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.card.effects.interfaces;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;

/**
 *
 * @author csiqueira
 */
public interface DefenseEffect {
    public Boolean stops(AttackEvent attack);
    public Boolean stopsFocused();
}
