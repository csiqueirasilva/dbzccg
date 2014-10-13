/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.users.authority;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
class AuthorityDAO {
    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    void persistAuthority(Authority a) {
        
        try {
            if(a != null) {
                em.persist(a);
            }
        } catch (NoResultException e) {
        }
    }
    
    Authority getAuthority(AuthorityType authority) {
        Authority a = null;
        
        try {
            if(authority != null) {
                a = (Authority) em.createQuery("SELECT a FROM Authority a WHERE a.authorityType = :authority").setParameter("authority", authority).getSingleResult();
            }
        } catch (NoResultException e) {
        }
        
        return a;
    }
}
