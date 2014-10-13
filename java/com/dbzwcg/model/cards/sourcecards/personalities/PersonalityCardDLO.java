/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.sourcecards.personalities;

import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.types.CollectionType;
import java.util.List;

/**
 *
 * @author csiqueira
 */
public class PersonalityCardDLO {

    private PersonalityCardDLO() {
    }
    
    public static void convertSourceCardToPersonalityCard(CollectionType collectionType, String cardNumber, List<String> powerStages, AlignmentType alignment, String PUR, Integer level) {
        (new PersonalityCardDAO()).convertSourceCardToPersonalityCard(collectionType, cardNumber, powerStages, alignment, PUR, level);
    }
}