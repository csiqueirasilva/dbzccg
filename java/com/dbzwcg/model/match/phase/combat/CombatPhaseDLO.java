/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.phase.combat;

import com.dbzwcg.model.events.cardeffects.attacks.AttackEvent;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.personality.MatchPersonality;
import com.dbzwcg.model.match.personality.MatchPersonalityDLO;
import com.dbzwcg.model.match.phase.combat.internal.InternalCombatPhase;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.PersonalityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 *
 * @author csiqueira
 */
public class CombatPhaseDLO {
    
    public static List<MatchPlayer> getCombatPlayers(CombatPhase phase) {
        List<MatchPlayer> players = new ArrayList<>();
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase(phase);
        players.add(icp.getAttackingPlayer());
        players.add(icp.getDefendingPlayer());
        return players;
    }
    
    public static Boolean checkCombatPhaseEnd (CombatPhase phase) {
        return phase.getPhases().size() > 1 && phase.getPhases().get(phase.getPhases().size() - 1).getAttackerPhasePassed() 
                && phase.getPhases().get(phase.getPhases().size() - 2).getAttackerPhasePassed();
    }
    
    public static InternalCombatPhase getLastInternalPhase (CombatPhase phase) {
        return phase.getPhases().get(phase.getPhases().size() - 1);
    }
    
    public static CombatPhase createCombatPhase(MatchPlayer declaringPlayer, MatchPlayer declaredPlayer) {
        CombatPhase c = new CombatPhase();
        
        c.setDeclaredPlayer(declaredPlayer);
        c.setDeclaringPlayer(declaringPlayer);
        c.setPhases(new ArrayList<InternalCombatPhase>());
        
        return c;
    }
    
    public static void addInternalPhase(Match m, CombatPhase phase) {
        InternalCombatPhase newIcp = new InternalCombatPhase();
        try {
            InternalCombatPhase icp = phase.getPhases().get(phase.getPhases().size() - 1);
            newIcp.setAttackingPlayer(icp.getDefendingPlayer());
            newIcp.setDefendingPlayer(icp.getAttackingPlayer());
            newIcp.setPhaseNumber(icp.getPhaseNumber() + 1);
        } catch (ArrayIndexOutOfBoundsException e) {
            newIcp.setAttackingPlayer(phase.getDeclaringPlayer());
            newIcp.setDefendingPlayer(phase.getDeclaredPlayer());
            newIcp.setPhaseNumber(1);
        }
        phase.getPhases().add(newIcp);
    }
    
    public static Set<PersonalityType> getDefendingAttackPersonality (Match m) {
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase());
        AttackEvent ae = icp.getAttackEvent();
        MatchPersonality personality = ae.getDefendingPersonality();
        MatchCard personalityMatchCard = MatchPersonalityDLO.getCurrentPersonality(personality);
        return personalityMatchCard.getSourceCard().getPersonalities();
    }
    
    public static Set<PersonalityType> getPerformingAttackPersonality (Match m) {
        InternalCombatPhase icp = CombatPhaseDLO.getLastInternalPhase((CombatPhase) m.getCurrentPhase());
        AttackEvent ae = icp.getAttackEvent();
        MatchPersonality personality = ae.getAttackingPersonality();
        MatchCard personalityMatchCard = MatchPersonalityDLO.getCurrentPersonality(personality);
        return personalityMatchCard.getSourceCard().getPersonalities();
    }
}
