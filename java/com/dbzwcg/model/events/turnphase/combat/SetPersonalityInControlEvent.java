/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.turnphase.combat;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class SetPersonalityInControlEvent extends MatchEvent {

    private MatchPersonality personality;
    
    public SetPersonalityInControlEvent(GameMechanic gameMechanic, MatchPlayer player, MatchPersonality personality) {
        super(gameMechanic, player);
        super.player = player;
        this.personality = personality;
        super.displayableToUser = true;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        super.player.setPersonalityInControl(this.personality);
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s set " + MatchPersonalityDLO.getCurrentPersonality(this.personality).getSourceCard().getName() + " as "
                + "the personality in control due to the effects of " + ((GameMechanic) super.getSourceRawObject()).getName() + ".";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
