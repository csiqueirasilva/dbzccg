/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.instancedcards;

import com.dbzwcg.model.cards.sourcecards.SourceCardDLO;
import com.dbzwcg.model.users.user.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import org.hibernate.Session;
import org.hibernate.jdbc.ReturningWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
public class InstancedCardDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    @Autowired
    private SourceCardDLO sourceCardDLO;

    InstancedCard getInstancedCardById(Integer id) {
        InstancedCard card = null;

        if (id != null) {
            Query q = this.em.createQuery("SELECT c FROM InstancedCard c WHERE c.id = :id", InstancedCard.class);
            card = (InstancedCard) q.setParameter("id", id).getSingleResult();
        }

        return card;
    }

    List<InstancedCard> getCollectionByUser(User usr) {
        List<InstancedCard> list = null;

        if (usr != null && usr.getId() != null) {
            Query q = this.em.createQuery("SELECT i FROM InstancedCard i WHERE i.owner = :owner", InstancedCard.class);
            list = (List<InstancedCard>) q.setParameter("owner", usr).getResultList();
        }

        return list;
    }

    List<InstancedCard> addFromBoosterPack(final User usr, final Integer numberOfPacks, final Enum saga) {
        List<InstancedCard> cards = null;

        if (usr != null && usr.getId() != null && saga != null && numberOfPacks != null && numberOfPacks > 0) {
            Session session = (Session) em.getDelegate();

            cards = session.doReturningWork(new ReturningWork<List<InstancedCard>>() {

                public List<InstancedCard> execute(Connection cnctn) throws SQLException {
                    List<InstancedCard> cards = new ArrayList<>();

                    PreparedStatement ps = cnctn.prepareStatement("SELECT * FROM generate_packs(?, ?) f(packnumber integer, cardid bigint, cardname text, rarity text, foil boolean, number text)");
                    ps.setInt(1, numberOfPacks);

                    try {
                        ps.setString(2, ((String) saga.getDeclaringClass().getField("dbPrefix").get(null)) + saga.toString());
                    } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
                        Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }

                    ResultSet rs = ps.executeQuery();

                    while (rs.next()) {
                        Integer idCard = rs.getInt(2);
                        String cardNumber = rs.getString(6);
                        Boolean foil = rs.getBoolean(5);

                        InstancedCard ic = new InstancedCard();

                        // class for name to get card properties
                        ic.setSourceCard(sourceCardDLO.getSourceCardById(idCard));
                        ic.setTexturePath(InstancedCardDLO.getDefaultTexturePath(saga, cardNumber));

                        if (foil) {
                            ic.setFoil(InstancedCardDLO.getFoilType(saga, cardNumber));
                        }

                        ic.setOwner(usr);
                        ic.setTradeable(true);
                        ic.setOfferTrade(false);
                        ic.setSpecularMapPath(InstancedCardDLO.getSpecularMapPath(saga, cardNumber));
                        ic.setAlternativeArt(false);

                        em.persist(ic);
                        cards.add(ic);
                    }

                    return cards;
                }
            });
        }

        return cards;
    }

}
