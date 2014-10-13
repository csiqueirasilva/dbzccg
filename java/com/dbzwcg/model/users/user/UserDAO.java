/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.users.user;

import com.dbzwcg.services.authentication.CustomUserDetails;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
class UserDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    void persistUserToDatabase(User usr) {
        em.merge(usr);
    }

    Integer getNumberOfUsersOnline() {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.online = true");
        Integer ret = q.getResultList().size();

        return ret;
    }

    User getUserFromId(Integer id) {
        User u = null;

        try {
            u = em.find(User.class, id);
        } catch (javax.persistence.NoResultException e) {
        }

        return u;
    }

    User getUserFromUsername(String email) {
        User u = null;

        try {
            Query q = em.createQuery("SELECT u FROM User u WHERE u.email = :email");
            u = (User) q.setParameter("email", email).getSingleResult();
        } catch (javax.persistence.NoResultException e) {
        }

        return u;
    }

    CustomUserDetails getUserDetails(String email) throws UsernameNotFoundException {
        User u = this.getUserFromUsername(email);

        CustomUserDetails cud = null;

        if (u != null && !u.getRoles().isEmpty()) {
            cud = new CustomUserDetails(u);
        }

        return cud;
    }

    void updateOnline(Integer userId, Boolean online) {
        if (userId != null && online != null) {
            try {
                User u = em.find(User.class, userId);
                u.setOnline(online);

            } catch (NoResultException | NullPointerException e) {
            }
        }
    }
}
