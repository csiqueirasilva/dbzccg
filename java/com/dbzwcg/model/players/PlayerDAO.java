/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.players;

import com.dbzwcg.model.users.user.User;
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
public class PlayerDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    Boolean checkPlayerInMatch(Player p) {
        Boolean ret = null;
        if (p != null && p.getId() != null) {
            Query q = em.createQuery("SELECT p FROM MatchPlayer p WHERE :player = p.player AND p.match.terminated = false");
            ret = !q.setParameter("player", p).getResultList().isEmpty();
        }
        return ret;
    }

    Player getPlayerFromEmail(String email) {
        Player p = null;
        try {
            Query q = em.createQuery("SELECT p FROM Player p WHERE p.email = :email", User.class);
            p = (Player) q.setParameter("email", email).getSingleResult();
        } catch (NoResultException e) {
        }

        return p;
    }

    void updatePoints(Integer playerId, Integer points) {

        if (playerId != null && points != null) {
            try {

                Player p = em.find(Player.class, playerId);
                Integer playerPoints = p.getPoints();
                p.setPoints(playerPoints + points);
                em.persist(p);

            } catch (NoResultException | NullPointerException e) {
            }
        }
    }

    Player persistPlayerToDatabase(Player player) {

        if (player != null) {
            em.persist(player);
        }

        return player;
    }
}
