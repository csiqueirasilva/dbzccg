/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.attacks;

import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.types.effects.AttackType;

/**
 *
 * @author csiqueira
 */
public abstract class Attack {
    protected MatchDamage damage;
    protected AttackType type;
    protected Boolean focused;    
}