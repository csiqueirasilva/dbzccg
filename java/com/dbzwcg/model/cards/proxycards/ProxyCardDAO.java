/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.proxycards;

import com.dbzwcg.model.cards.instancedcards.InstancedCardDLO;
import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.services.sql.ConnectionFactory;
import com.dbzwcg.types.FoilType;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
class ProxyCardDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    public static void main (String args[]) {
        List<ProxyCard> cards = new ProxyCardDAO().getProxyCards();
        System.out.println(cards);
    }
    
    ProxyCard getProxyCardBySourceId(Integer id, String altArt, FoilType foil) {
        Query query = em.createQuery("select s from SourceCard s where s.id = :id");

        SourceCard srcCard = (SourceCard) query.setParameter("id", id).getSingleResult();
        ProxyCard card = new ProxyCard();
        String cardNumber = srcCard.getNumber();
        Enum saga = srcCard.getSaga();
        card.setSourceCard(srcCard);
        card.setTexturePath(altArt != null ? altArt : InstancedCardDLO.getDefaultTexturePath(saga, cardNumber));
        card.setSpecularMapPath(InstancedCardDLO.getSpecularMapPath(saga, cardNumber));
        card.setFoil(foil);
        card.setAlternativeArt(altArt != null);
        
        return card;
    }
    
    List<ProxyCard> getProxyCards() {
        Query query = em.createQuery("select s from SourceCard s");
        List<SourceCard> sourceCards = query.getResultList();
        
        List<ProxyCard> cards = new ArrayList<>();
        for(int i = 0; i < sourceCards.size(); i++) {
            String cardNumber = sourceCards.get(i).getNumber();
            Enum saga = sourceCards.get(i).getSaga();
            
            ProxyCard ic = new ProxyCard();

            ic.setSourceCard(sourceCards.get(i));
            ic.setTexturePath(InstancedCardDLO.getDefaultTexturePath(saga, cardNumber));
            ic.setSpecularMapPath(InstancedCardDLO.getSpecularMapPath(saga, cardNumber));

            cards.add(ic);
        }

        return cards;
    }
}