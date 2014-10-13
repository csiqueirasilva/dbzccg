/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.powerup;

import com.dbzwcg.model.events.powerstages.PowerStageGainEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.mainpersonality.MatchMainPersonality;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;

/**
 *
 * @author csiqueira
 */
public class PowerUpPhaseEvent extends MatchEvent {

    public PowerUpPhaseEvent(GameMechanic gameMechanic, MatchPlayer player) {
        super(gameMechanic, player);
        super.player = player;
        super.nextEvent = AfterPowerUpPhaseEvent.class;
        super.displayableToUser = true;
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s Power Up Phase.";
    }

    private void powerUpPersonality(Match m, MatchPersonality personality) {
        Integer rating = MatchPersonalityDLO.getPowerUpRatingAsInteger(personality);
        PowerStageGainEvent psge = new PowerStageGainEvent((GameMechanic) this.getSourceRawObject(), personality, super.player, rating);
        MatchDLO.applyEvent(m, psge);
    }

    @Override
    protected void phaseEffect(Match m) {
        MatchMainPersonality mp = super.player.getMainPersonality();
        powerUpPersonality(m, mp);

        // do it for allies
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
