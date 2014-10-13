/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.personality;

import com.dbzwcg.model.cards.sourcecards.personalities.PersonalityCard;
import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffect;
import com.dbzwcg.model.match.card.effects.generics.GenericCardEffectDLO;
import com.dbzwcg.model.match.mainpersonality.MatchMainPersonality;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.types.LimitType;
import java.util.Objects;

/**
 *
 * @author csiqueira
 */
public class MatchPersonalityDLO {

    public static Boolean retreatLevel(MatchPersonality p) {
        Boolean ret = false;
        Integer level = p.getCurrentPersonalityLevel();
        
        if(level != LimitType.BEGINNING_MAIN_PERSONALITY_LEVEL.getValue()) {
            p.setCurrentPersonalityLevel(level - 1);
            p.setCurrentPowerStageAboveZero(LimitType.LEVEL_DOWN_POWER_STAGE_SET.getValue());
            ret = true;
        }
        
        return ret;
    }
    
    public static Boolean advanceLevel(MatchPersonality p) {
        Boolean ret = false;
        Integer level = p.getCurrentPersonalityLevel();
        if(level != p.getPersonalities().size()) {
            p.setCurrentPersonalityLevel(level + 1);
            ret = true;
        }

        p.setCurrentPowerStageAboveZero(getMaxPowerStageNumber(p));
        
        return ret;
    }

    private static Integer getMaxPowerStageNumber(MatchPersonality p) {
        MatchCard c = MatchPersonalityDLO.getCurrentPersonality(p);
        PersonalityCard source = (PersonalityCard) c.getSourceCard();
        Integer max = source.getPowerStages().size() - 1;
        return max;
    }

    public static String getCurrentPowerStageValue(MatchPersonality p) {
        MatchCard c = MatchPersonalityDLO.getCurrentPersonality(p);
        PersonalityCard source = (PersonalityCard) c.getSourceCard();
        String ps = source.getPowerStages().get(p.getCurrentPowerStageAboveZero());
        return ps;
    }

    public static MatchCard getCurrentPersonality(MatchPersonality p) {
        return p.getPersonalities().get(p.getCurrentPersonalityLevel() - 1);
    }

    public static Boolean setPowerStage(MatchPersonality p, Integer powerStages) {
        Boolean ret = false;
        Integer max = MatchPersonalityDLO.getMaxPowerStageNumber(p);
        Integer setChange;
        Integer minPowerStage = LimitType.MIN_POWER_STAGE.getValue();

        if (powerStages > max) {
            setChange = max;
        } else if (powerStages < minPowerStage) {
            setChange = minPowerStage;
        } else {
            setChange = powerStages;
        }

        if (!Objects.equals(setChange, p.getCurrentPowerStageAboveZero())) {
            ret = true;
            p.setCurrentPowerStageAboveZero(setChange);
        }

        return ret;
    }

    public static Integer losePowerStage(MatchPersonality p, Integer powerStages) {
        Integer leftover = 0;
        Integer minPowerStage = LimitType.MIN_POWER_STAGE.getValue();

        if ((p.getCurrentPowerStageAboveZero() - powerStages) < minPowerStage) {
            leftover = -(p.getCurrentPowerStageAboveZero() - powerStages);
            p.setCurrentPowerStageAboveZero(minPowerStage);
        } else {
            p.setCurrentPowerStageAboveZero(p.getCurrentPowerStageAboveZero() - powerStages);
        }
        return leftover;
    }

    public static Integer gainPowerStage(MatchPersonality p, Integer powerStages) {
        Integer leftover = 0;
        Integer max = MatchPersonalityDLO.getMaxPowerStageNumber(p);
        if ((p.getCurrentPowerStageAboveZero() + powerStages) > max) {
            leftover = (p.getCurrentPowerStageAboveZero() + powerStages) % max;
            p.setCurrentPowerStageAboveZero(max);
        } else {
            p.setCurrentPowerStageAboveZero(p.getCurrentPowerStageAboveZero() + powerStages);
        }
        return leftover;
    }

    public static Integer getPowerUpRatingAsInteger(MatchPersonality personality) {
        MatchCard card = MatchPersonalityDLO.getCurrentPersonality(personality);
        Integer pur = 0;

        try {
            pur += Integer.parseInt(((PersonalityCard) card.getSourceCard()).getPUR());
        } catch (NumberFormatException e) {
        }

        pur += personality.getPowerUpRatingModifier();

        return pur;
    }

    public static void playMainPersonality(Match m, MatchPlayer p, MatchMainPersonality mp) {
        MatchCard currentPersonality = MatchPersonalityDLO.getCurrentPersonality(mp);
        GenericCardEffect effect = currentPersonality.getEffect();
        GenericCardEffectDLO.putCardInPlay(effect, m, p, null);
        p.setMainPersonality(mp);
    }
}