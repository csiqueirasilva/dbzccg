/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.costs;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public abstract class MatchCost {
    public abstract Boolean checkCost(Match m, MatchPlayer p);
    public abstract void payCost(Match m, MatchPlayer p);
}