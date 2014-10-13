/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.instancedcards;

import com.dbzwcg.types.FoilType;
import com.dbzwcg.model.users.user.User;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class InstancedCardDLO {
    
    @Autowired
    private InstancedCardDAO dao; 
    
    public static String getDefaultTexturePath(Enum saga, String number) {
        String path = "images/cardimages/%prefix%/%saga%/%number%.jpg";
        
        String prefix = "..";
        try {
            prefix = ((String) saga.getDeclaringClass().getField("dbPrefix").get(null)).replace("_","");
        } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
            Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return path.replace("%prefix%", prefix).replace("%number%", number).replace("%saga%", saga.toString().toLowerCase());
    }
    
    public static FoilType getFoilType (Enum saga, String number) {
        FoilType ft;
        
        ft = FoilType.valueOf(saga.toString() + "_DEFAULT");
        
        return ft;
    }
    
    public static String getSpecularMapPath(Enum saga, String number) {
        String path = "images/cardimages/%prefix%/%saga%/specularmap.jpg";
        
        String prefix = "..";
        try {
            prefix = ((String) saga.getDeclaringClass().getField("dbPrefix").get(null)).replace("_","");
        } catch (NoSuchFieldException ex) {
            Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SecurityException ex) {
            Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(InstancedCardDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return path.replace("%prefix%", prefix).replace("%number%", number).replace("%saga%", saga.toString().toLowerCase());
    }
    
    public List<InstancedCard> getCollectionByUser(User usr) {
        return dao.getCollectionByUser(usr);
    }

    public List<InstancedCard> addFromBoosterPack(final User usr, final Integer numberOfPacks, final Enum saga) {
        return dao.addFromBoosterPack(usr, numberOfPacks, saga);
    }
    
    public InstancedCard getInstancedCardById (Integer id) { 
        return dao.getInstancedCardById(id);
    }
}
