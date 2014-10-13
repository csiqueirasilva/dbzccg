/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events.cardmove.failures;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public class MatchCardGroupOutOfCardsEvent extends MatchEvent {

    private MatchCardGroup group;
    
    public MatchCardGroupOutOfCardsEvent(GameMechanic gameMechanic, MatchPlayer player, MatchCardGroup group) {
        super(gameMechanic, player);
        super.nextEvent = null;
        super.player = player;
        this.group = group;
    }
    
    @Override
    protected void phaseEffect(Match m) {
    }

    @Override
    public String logMessage() {
        return super.player.getPlayer().getDisplayName() + "'s " + MatchCardGroupDLO.getReadableName(this.group.getFieldType()) + " is out of cards.";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}