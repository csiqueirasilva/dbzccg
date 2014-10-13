/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat.damage;

import com.dbzwcg.model.gamemechanics.GameMechanic;
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
public class FinishDamageApplicationEvent extends MatchEvent {

    private final MatchDamage source;
    private final MatchDamage total;

    public MatchDamage getSource() {
        return source;
    }

    public MatchDamage getTotal() {
        return total;
    }

    public FinishDamageApplicationEvent(AttackEffect attack, MatchPlayer player, MatchDamage source, MatchDamage total) {
        super((GameMechanic) attack, player);
        super.player = player;
        this.source = source;
        this.total = total;
        super.displayableToUser = true;
    }

    @Override
    protected void phaseEffect(Match m) {
        AfterDamageApplicationEvent adae
                = new AfterDamageApplicationEvent((GenericCardEffect) super.getSourceRawObject(),
                        super.player, this.source, this.total);
        MatchDLO.applyInterruptedEvent(m, adae);
    }

    @Override
    public String logMessage() {
        return "Total damage: " + this.total.getStages() + " power stages and " + this.total.getCards() + " life cards.";
    }

    @Override
    public void applyFromDatabase(Match m) {
    }

}
