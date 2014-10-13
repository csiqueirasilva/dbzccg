/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.events.turnphase.combat.damage;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class AfterDamageApplicationEvent extends MatchEvent {
    
    protected final MatchDamage sourceDamage;
    protected final MatchDamage totalDamage;

    public MatchDamage getSourceDamage() {
        return sourceDamage;
    }
    
    public MatchDamage getTotalDamage() {
        return totalDamage;
    }

    public AfterDamageApplicationEvent (GenericCardEffect effect, MatchPlayer player, MatchDamage sourceDamage, MatchDamage totalDamage) {
        super(effect, player);
        this.sourceDamage = sourceDamage;
        this.totalDamage = totalDamage;
        super.player = player;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        // nothing
    }

    @Override
    public String logMessage() {
        return "AFTER DAMAGE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
