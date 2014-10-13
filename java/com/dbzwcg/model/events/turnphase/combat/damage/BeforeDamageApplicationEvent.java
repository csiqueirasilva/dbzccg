/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.events.turnphase.combat.damage;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeforeDamageApplicationEvent extends MatchEvent {

    protected final MatchDamage damage;

    public MatchDamage getDamage() {
        return damage;
    }
    
    public BeforeDamageApplicationEvent (GenericCardEffect effect, MatchPlayer player, MatchDamage damage) {
        super(effect, player);
        super.player = player;
        this.damage = damage;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        BeginDamageApplicationEvent bdae = new BeginDamageApplicationEvent((GenericCardEffect) this.getSourceRawObject(), super.player, this.damage);
        MatchDLO.applyInterruptedEvent(m, bdae);
    }

    @Override
    public String logMessage() {
        return "BEFORE DAMAGE EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
