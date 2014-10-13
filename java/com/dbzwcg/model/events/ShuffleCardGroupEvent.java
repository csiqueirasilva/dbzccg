/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.cardgroup.MatchCardGroupDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.players.MatchPlayerDLO;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 *
 * @author csiqueira
 */
public class ShuffleCardGroupEvent extends MatchEvent {

    private MatchCardGroup sourceGroup;
    private MatchCardGroup shuffledGroup;

    public MatchCardGroup getSourceGroup() {
        return sourceGroup;
    }

    public void setSourceGroup(MatchCardGroup sourceGroup) {
        this.sourceGroup = sourceGroup;
    }

    public MatchCardGroup getShuffledGroup() {
        return shuffledGroup;
    }

    public void setShuffledGroup(MatchCardGroup shuffledGroup) {
        this.shuffledGroup = shuffledGroup;
    }

    public ShuffleCardGroupEvent(GameMechanic gameMechanic, MatchPlayer target, MatchCardGroup sourceGroup) {
        super(gameMechanic, target);
        super.player = target;
        super.displayableToUser = true;
        this.sourceGroup = sourceGroup;
    }

    @Override
    protected void phaseEffect(Match m) {
        this.shuffledGroup = MatchCardGroupDLO.createListMatchCard(m, (List) this.sourceGroup, this.sourceGroup.getOwner(), this.sourceGroup.getFieldType());
        Random rnd = new Random();
        rnd.setSeed(System.currentTimeMillis());
        Collections.shuffle(this.shuffledGroup, rnd);
        MatchPlayerDLO.setCardGroupByType(super.player, this.shuffledGroup);
    }

    @Override
    public String logMessage() {
        return "Shuffling " + super.player.getName() + "'s " + MatchCardGroupDLO.getReadableName(sourceGroup.getFieldType()) + ".";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
