/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.players;

import com.dbzwcg.model.players.Player;
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
public class MatchPlayerDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    void updateConnected(Integer matchPlayerId, Boolean online) {
        if (matchPlayerId != null && online != null) {
            try {
                MatchPlayer u = em.find(MatchPlayer.class, matchPlayerId);
                u.setConnected(online);
                em.merge(u);
            } catch (NoResultException | NullPointerException e) {
            }
        }
    }

    MatchPlayer persistPlayerToDatabase(MatchPlayer player) {

        if (player != null) {
            em.persist(player);
        }

        return player;
    }

    MatchPlayer getActiveMatchPlayer(Player player) {
        MatchPlayer ret = null;

        if (player != null && player.getId() != null) {
            try {
                Query q = em.createQuery("SELECT p FROM MatchPlayer p WHERE p.match.terminated != false AND p.player = :player");
                q.setParameter("player", player);

                if (q.getResultList().size() > 1) {
                    throw new UnsupportedOperationException("Player active in more than one match.");
                }

                ret = (MatchPlayer) q.getSingleResult();
            } catch (NoResultException | NullPointerException e) {
            }
        }

        return ret;
    }
}
