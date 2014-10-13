/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.events;

import com.dbzwcg.model.events.turn.PlayerStartTurnEvent;
import com.dbzwcg.model.gamemechanics.GameMechanic;
import com.dbzwcg.model.gamemechanics.turns.StartTurn;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.log.creator.GameMechanicMatchEventCreator;
import com.dbzwcg.model.match.log.creator.PlayerMatchEventCreator;
import com.dbzwcg.model.match.players.MatchPlayer;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
public class GameStartEvent extends MatchEvent {

    protected GameStartEvent() {
    }

    public GameStartEvent(GameMechanic gameMechanic, Match m) {
        this.sourceActor = new GameMechanicMatchEventCreator(gameMechanic);
        
        List<MatchPlayer> players = m.getPlayers();
        Integer firstPlayerIndex = (int) (Math.random() * (players.size() - 1));
        super.player = players.get(firstPlayerIndex);
        
        this.targetActor = new PlayerMatchEventCreator(super.player);
    }
    
    @Override
    public String logMessage() {
        return "Starting the match.";
    }

    @Override
    public void phaseEffect(Match m) {
        List<MatchPlayer> players = m.getPlayers();
        
        for (MatchPlayer player1 : players) {
            ShuffleCardGroupEvent scge = new ShuffleCardGroupEvent((GameMechanic) this.getSourceRawObject(), player1, player1.getLifeDeck());
            MatchDLO.applyEvent(m, scge);
        }
        
        PlayerStartTurnEvent pste = new PlayerStartTurnEvent(new StartTurn(), super.player);
        MatchDLO.applyEvent(m, pste);
    }

    @Override
    public void applyFromDatabase(Match m) {
    }
}
