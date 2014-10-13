/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.card.effects.interfaces;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.players.MatchPlayer;

/**
 *
 * @author csiqueira
 */
public interface UseWhenNeededEffect {
    public Boolean checkUseWhenNeeded(Match m, MatchEvent event, MatchPlayer player, Boolean before);
}