/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.proxycards;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class ProxyCardDLO {
    
    @Autowired
    private ProxyCardDAO dao;
    
    public List<ProxyCard> getProxyCards() {
        return dao.getProxyCards();
    }
    
    public ProxyCard getProxyCardBySourceId (Integer id) {
        return dao.getProxyCardBySourceId(id, null, null);
    }
}
