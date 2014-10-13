/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.damage;

import com.dbzwcg.model.events.turnphase.combat.damage.lifecard.DropLifeCardDamageEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.interfaces.AttackEffect;
import com.dbzwcg.model.match.damage.MatchDamage;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class BeginDamageApplicationEvent extends MatchEvent {

    protected MatchDamage damage;

    public BeginDamageApplicationEvent(GenericCardEffect effect, MatchPlayer player, MatchDamage damage) {
        super(effect, player);
        this.damage = damage;
        super.player = player;
    }

    @Override
    protected void phaseEffect(Match m) {
        // create total damage
        // call instances of power stage damage and life card damage
        // both instances will update total damage accordingly while reducing damage
        // at the end, update the original match damage to the values of the total damage

        MatchDamage counterDamage = new MatchDamage();

        CalculatePowerStageDamageEvent psde = new CalculatePowerStageDamageEvent((GenericCardEffect) this.getSourceRawObject(),
                super.player,
                this.damage,
                counterDamage);
        MatchDLO.applyInterruptedEvent(m, psde);

        FinishDamageApplicationEvent fdae = new FinishDamageApplicationEvent((AttackEffect) super.getSourceRawObject(), super.player, this.damage, counterDamage);
        MatchDLO.applyInterruptedEvent(m, fdae);
    }

    @Override
    public String logMessage() {
        return "BEGIN DAMAGE";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
