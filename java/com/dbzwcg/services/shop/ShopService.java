/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.shop;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.instancedcards.InstancedCardDLO;
import com.dbzwcg.model.exceptions.ShopException;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.PlayerDLO;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class ShopService {

    @Autowired
    private PlayerDLO playerDLO;

    @Autowired
    private InstancedCardDLO instancedCardDLO;
    
    public final static Integer pointPackPrice = 3;
    
    public List<InstancedCard> buyPack (Enum saga, Player usr, Integer numberOfPacks) throws ShopException {
        List<InstancedCard> list = null;
        
        if(usr != null && usr.getId() != null && saga != null) {
            if(usr.getPoints() != null && usr.getPoints() >= (pointPackPrice * numberOfPacks)) {
                list = instancedCardDLO.addFromBoosterPack(usr, numberOfPacks, saga);
                playerDLO.updatePoints(usr.getId(), -(pointPackPrice * numberOfPacks));
            } else if (numberOfPacks < 0) {
                throw new ShopException(ShopException.INVALID_PURCHASE);
            } else {
                throw new ShopException(ShopException.NOT_ENOUGH_POINTS);
            }
            
        } else if (saga == null) {
            throw new ShopException(ShopException.NO_VALID_SAGA);            
        } else {
            throw new ShopException(ShopException.NO_VALID_USER);
        }
        
        return list;
    }
}
