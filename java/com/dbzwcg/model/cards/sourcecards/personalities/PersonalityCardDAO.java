/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.sourcecards.personalities;

import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.cards.sourcecards.SourceCardDLO;
import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.types.CollectionType;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
class PersonalityCardDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;
    
    @Autowired
    private SourceCardDLO sourceCardDLO;
    
    void convertSourceCardToPersonalityCard(CollectionType collectionType, String cardNumber, List<String> powerStages, AlignmentType alignment, String PUR, Integer level) {
        SourceCard c = sourceCardDLO.getSourceCardByNumber(collectionType, cardNumber);
        PersonalityCard p = new PersonalityCard();

        p.setSaga(c.getSaga());
        p.setRarity(c.getRarity());
        p.setStyle(c.getStyle());
        p.setType(c.getType());
        p.setName(c.getName());
        p.setDescription(c.getDescription());
        p.setEffectTypes(c.getEffectTypes());
        p.setCardLimit(c.getCardLimit());
        p.setPersonalities(c.getPersonalities());
        p.setHeadshots(c.getHeadshots());
        p.setNumber(c.getNumber());
        p.setCollectionType(c.getCollectionType());

        p.setPowerStages(powerStages);
        p.setPUR(PUR);
        p.setAlignment(alignment);
        p.setPersonalityLevel(level);


        em.remove(em.find(SourceCard.class, c.getId()));

        em.persist(p);
    }
}