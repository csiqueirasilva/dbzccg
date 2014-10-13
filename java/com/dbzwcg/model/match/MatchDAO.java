/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match;

import com.dbzwcg.model.decks.Deck;
import com.dbzwcg.model.match.card.MatchCard;
import com.dbzwcg.model.match.cardgroup.MatchCardGroup;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.Player;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
public class MatchDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    Match findMatchById(Integer id) {
        Match m = null;

        if (id != null) {
            m = em.find(Match.class, id);
        }

        return m;
    }

    private void startPersistCardGroup(EntityManager em, MatchPlayer p, MatchCardGroup group) {
        em.persist(group);
        for (MatchCard card : group) {
            card.setOwner(p.getPlayer());
            card.setGroup(group);
            card.getEffect().setCard(null);
            em.persist(card.getEffect());
            em.persist(card);
            card.getEffect().setCard(card);
            em.merge(card.getEffect());
        }
    }

    private void finishPersistCardGroup(EntityManager em, MatchPlayer p, MatchCardGroup group) {
        group.setOwner(p);
        em.merge(group);
    }

    Match persistMatchToDatabase(Match m) {
        if (m != null) {
            em.persist(m.pat);
            em.persist(m.callbacks);
            for (MatchPlayer p : m.getPlayers()) {
                startPersistCardGroup(em, p, p.getDiscardPile());
                startPersistCardGroup(em, p, p.getDragonballs());
                startPersistCardGroup(em, p, p.getHand());
                startPersistCardGroup(em, p, p.getInPlay());
                startPersistCardGroup(em, p, p.getLifeDeck());
                startPersistCardGroup(em, p, p.getMainPersonality().getPersonalities());
                em.persist(p.getMainPersonality());
                startPersistCardGroup(em, p, p.getNonCombats());
                startPersistCardGroup(em, p, p.getRemovedFromTheGame());
                startPersistCardGroup(em, p, p.getSetAside());
                em.persist(p);
            }
            em.persist(m);
            for (MatchPlayer p : m.getPlayers()) {
                finishPersistCardGroup(em, p, p.getDiscardPile());
                finishPersistCardGroup(em, p, p.getDragonballs());
                finishPersistCardGroup(em, p, p.getHand());
                finishPersistCardGroup(em, p, p.getInPlay());
                finishPersistCardGroup(em, p, p.getLifeDeck());
                finishPersistCardGroup(em, p, p.getMainPersonality().getPersonalities());
                finishPersistCardGroup(em, p, p.getNonCombats());
                finishPersistCardGroup(em, p, p.getRemovedFromTheGame());
                finishPersistCardGroup(em, p, p.getSetAside());

                p.setMatch(m);
                em.merge(p);
            }
        }

        return m;
    }

    Map<String, Long> getWinRate(Deck deck) {
        Map<String, Long> map = new HashMap<>();
 
        Query query = em.createQuery("SELECT count(G) FROM GameMatch G, MatchPlayer P,"
                + " com.dbzwcg.decks.Deck D WHERE P.match = G AND "
                + "P.player = G.winner AND G.terminated IS TRUE "
                + "AND D.owner = P.player "
                + "AND D = :deck");

        query.setParameter("deck", deck);

        Long qtdWins = (Long) query.getSingleResult();

        query = em.createQuery("SELECT count(G) FROM GameMatch G, MatchPlayer P,"
                + " com.dbzwcg.decks.Deck D WHERE P.match = G AND "
                + " G.terminated IS TRUE "
                + "AND D.owner = P.player "
                + "AND D = :deck");

        query.setParameter("deck", deck);

        Long qtdMatches = (Long) query.getSingleResult();

        map.put("wins", qtdWins);
        map.put("loses", qtdMatches - qtdWins);

        return map;
    }

    List<Match> getRecentMatches(Deck d) {
        List<Match> list = null;

        Query query = em.createQuery("SELECT G FROM GameMatch G, MatchPlayer P, com.dbzwcg.decks.Deck D "
                + "WHERE P.match = G AND P.player = G.winner "
                + "AND G.terminated IS TRUE AND P.player = D.owner "
                + "AND D = :deck ORDER BY G.creation ASC");

        query.setParameter("deck", d);

        return list;
    }

    List<Match> getRecentMatches(Player p) {
        List<Match> list = null;

        Query query = em.createQuery("SELECT G FROM GameMatch G, MatchPlayer P "
                + "WHERE P.match = G AND P.player = G.winner "
                + "AND G.terminated IS TRUE AND P.player = :player "
                + "ORDER BY G.creation ASC");

        query.setParameter("player", p);

        return list;
    }

    Map<String, Long> getWinRate(Player p) {
        Map<String, Long> map = new HashMap<>();

        Query query = em.createQuery("SELECT count(G) FROM GameMatch G, MatchPlayer P WHERE P.match = G AND G.terminated IS TRUE AND P.player = :player");
        query.setParameter("player", p);

        Long qtdMatches = (Long) query.getSingleResult();

        query = em.createQuery("SELECT count(G) FROM GameMatch G, MatchPlayer P WHERE P.match = G AND P.player = G.winner AND G.terminated IS TRUE AND P.player = :player");
        query.setParameter("player", p);

        Long qtdWins = (Long) query.getSingleResult();

        map.put("wins", qtdWins);
        map.put("loses", qtdMatches - qtdWins);

        return map;
    }

}
