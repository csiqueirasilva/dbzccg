/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.players.ai;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.users.user.UserDLO;
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
public class AIPlayer extends Player {
    // Player Decisions
    public Boolean declarePhaseDecision(Match m) {
        return true;
    }
}