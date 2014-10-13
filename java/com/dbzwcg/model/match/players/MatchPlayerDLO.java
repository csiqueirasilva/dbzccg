/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.players;

import com.dbzwcg.model.events.noncombat.AfterNonCombatPhaseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.attacker.PassAttackerPhaseCombatPhaseEvent;
import com.dbzwcg.model.events.turnphase.combat.internal.defender.PassDefenderPhaseCombatPhaseEvent;
import com.dbzwcg.model.events.turnphase.declare.DeclarePhaseDeclareEvent;
import com.dbzwcg.model.events.turnphase.declare.DeclarePhaseNotDeclareEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.combat.CombatPhase;
import com.dbzwcg.model.match.phase.combat.CombatPhaseDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.phase.declare.DeclarePhase;
import com.dbzwcg.model.match.phase.noncombat.NonCombatPhase;
import com.dbzwcg.model.players.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class MatchPlayerDLO {
    
    @Autowired
    private MatchPlayerDAO dao;
    
    public static void setCardGroupByType(MatchPlayer player, MatchCardGroup cardGroup) {
        if (cardGroup != null) {
            switch (cardGroup.getFieldType()) {
                case lifeDeck:
                    player.setLifeDeck(cardGroup);
                    break;
                case hand:
                    player.setHand(cardGroup);
                    break;
                case removedFromTheGame:
                    player.setRemovedFromTheGame(cardGroup);
                    break;
                case nonCombats:
                    player.setNonCombats(cardGroup);
                    break;
                case dragonballs:
                    player.setDragonballs(cardGroup);
                    break;
                case discardPile:
                    player.setDiscardPile(cardGroup);
                    break;
                case inPlay:
                    player.setInPlay(cardGroup);
                    break;
                case setAside:
                    player.setSetAside(cardGroup);
            }
        }
    }

    public static void declarePhaseSkipCombat(Match m, MatchPlayer p) {
        DeclarePhase phase = (DeclarePhase) m.getCurrentPhase();
        MatchEvent declareOption = new DeclarePhaseNotDeclareEvent(phase, p);
        MatchDLO.applyEvent(m, declareOption);
    }

    public static void declarePhaseDeclareCombat(Match m, MatchPlayer p) {
        MatchPlayer declaredPlayer = null;
        for (int i = 0; i < m.getPlayers().size() && declaredPlayer == null; i++) {
            MatchPlayer itPlayer = m.getPlayers().get(i);
            if (itPlayer != p) {
                declaredPlayer = itPlayer;
            }
        }
        MatchPlayerDLO.declarePhaseDeclareCombat(m, p, declaredPlayer);
    }

    public static void declarePhaseDeclareCombat(Match m, MatchPlayer p, MatchPlayer declaredPlayer) {
        DeclarePhase phase = (DeclarePhase) m.getCurrentPhase();
        MatchEvent declareOption = new DeclarePhaseDeclareEvent(phase, p, declaredPlayer);
        MatchDLO.applyEvent(m, declareOption);
    }

    public static void endNonCombatPhase(Match m, MatchPlayer p) {
        NonCombatPhase phase = (NonCombatPhase) m.getCurrentPhase();
        MatchEvent postNonCombatPhase = new AfterNonCombatPhaseEvent(phase, p);
        MatchDLO.applyEvent(m, postNonCombatPhase);
    }

    public static void passInternalCombatPhase(Match m, MatchPlayer p) {
        CombatPhase phase = (CombatPhase) m.getCurrentPhase();
        InternalCombatPhase lastInternalPhase = CombatPhaseDLO.getLastInternalPhase(phase);
        MatchEvent event;
        if (p == lastInternalPhase.getDefendingPlayer()) {
            event = new PassDefenderPhaseCombatPhaseEvent(p);
        } else if (p == lastInternalPhase.getAttackingPlayer()) {
            event = new PassAttackerPhaseCombatPhaseEvent(p);
        } else {
            throw new UnsupportedOperationException("Player is not on the combat");
        }
        MatchDLO.applyInterruptedEvent(m, event);
    }

    public void setPlayerConnected(MatchPlayer player) {
        if (player != null && player.getId() != null) {
            dao.updateConnected(player.getId(), true);
        }
    }

    public void setPlayerDisconnected(MatchPlayer player) {
        if (player != null && player.getId() != null) {
            dao.updateConnected(player.getId(), false);
        }
    }
    
    public MatchPlayer getActiveMatchPlayer(Player player) {
        MatchPlayer ret = null;
        if(player != null) {
            ret = dao.getActiveMatchPlayer(player);
        }
        return ret;
    }
}