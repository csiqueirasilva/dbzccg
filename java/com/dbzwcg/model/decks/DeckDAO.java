/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.decks;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.proxycards.ProxyCard;
import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */

@Repository
public class DeckDAO {
    
    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    public static void main(String[] args) {
        //Deck d = new DeckDAO().getDeckById(2);

        User p = UserDLO.getUserFromUsername("root@dbzwcg.com");
        System.out.println(new DeckDAO().removeDeckById(p, 1));

        //System.out.println(d.toString());
    }

    boolean removeDeckById(User u, Integer id) {
        Deck d = null;
        boolean ret = false;
        if (id != null) {
            Query q = em.createQuery("SELECT d FROM Deck d WHERE d.id = :id AND d.owner = :owner", Deck.class);

            try {
                d = (Deck) q.setParameter("id", id).setParameter("owner", u).getSingleResult();
                em.remove(d);
                ret = true;
            } catch (javax.persistence.NoResultException e) {

            }

        }
        return ret;
    }

    Deck createDeckByUser(User usr) {
        Deck d = null;
        if (usr != null && usr.getId() != null) {
            d = new Deck();
            d.displayName = "Untitled Deck";
            try {
                d.setOwner(em.find(User.class, usr.getId()));
                em.persist(d);
            } catch (NoResultException e) {
            }
        }
        return d;
    }

    Deck getDeckByUserAndId(Integer id, User u) {
        Deck deck = null;

        if (id != null && u != null && u.getId() != null) {
            Query q = em.createQuery("SELECT d FROM Deck d WHERE d.id = :id AND d.owner = :owner");
            deck = (Deck) q.setParameter("id", id).setParameter("owner", u).getSingleResult();
        }

        return deck;
    }

    Deck getDeckById(Integer id) {
        Deck deck = null;

        if (id != null) {
            try {
                Query q = em.createQuery("SELECT d FROM Deck d WHERE d.id = :id");
                deck = (Deck) q.setParameter("id", id).getSingleResult();
            } catch (NoResultException e) {
            }
        }

        return deck;
    }

    void updateDeck(Deck d) {
        if (d != null && d.getId() != null && d.getOwner() != null) {
            Deck updateDeck = em.find(Deck.class, d.getId());

            if (d.getOwner().equals(updateDeck.getOwner())) {

                for (InstancedCard card : updateDeck.getMainPersonality()) {
                    if (card instanceof ProxyCard) {
                        em.remove(card);
                    }
                }

                for (InstancedCard card : updateDeck.getCards()) {
                    if (card instanceof ProxyCard) {
                        em.remove(card);
                    }
                }

                if (d.getMainPersonality() != null) {
                    for (int i = 0; i < d.getMainPersonality().size(); i++) {
                        if (d.getMainPersonality().get(i) instanceof ProxyCard && d.getMainPersonality().get(i).getId() == null) {
                            em.persist(d.getMainPersonality().get(i));
                        }
                    }
                }

                if (d.getCards() != null) {
                    for (int i = 0; i < d.getCards().size(); i++) {
                        if (d.getCards().get(i) instanceof ProxyCard && d.getCards().get(i).getId() == null) {
                            em.persist(d.getCards().get(i));
                        }
                    }
                }

                updateDeck.setMainPersonality(d.getMainPersonality());
                updateDeck.setCards(d.getCards());
            }
        }
    }

    List<Deck> getDecksByUser(User usr) {
        List<Deck> decks = null;

        if (usr != null && usr.getId() != null) {
            Query q = em.createQuery("SELECT d FROM Deck d WHERE d.owner = :owner");
            decks = (List<Deck>) q.setParameter("owner", usr).getResultList();
        }

        return decks;
    }
}
