/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.sourcecards;

import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.types.CollectionType;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class SourceCardDLO {

    @Autowired
    private SourceCardDAO dao;
    
    public HashMap<String, HashMap<String, HashMap<String, SourceCard>>> getSourceCardHashMapBySagaNumber() {
        HashMap<String, HashMap<String, HashMap<String, SourceCard>>> map = new HashMap<>();
        List<SourceCard> list = this.getSourceCardList();

        Reflections reflections = new Reflections("com.dbzwcg.types.sagas");

        Object[] sagas = (Object[]) reflections.getSubTypesOf(Enum.class).toArray();

        for (SourceCard c : list) {
            try {
                for (int i = 0; i < sagas.length; i++) {
                    Enum[] sagaTypes = (Enum[]) ((Class) sagas[i]).getEnumConstants();
                    int k = Arrays.binarySearch(sagaTypes, c.getSaga());
                    if (k != -1) {
                        Enum saga = sagaTypes[k];
                        String dbPrefix = ((String) saga.getClass().getField("dbPrefix").get(null)).replace("_","");
                        if (map.get(dbPrefix) == null) {
                            map.put(dbPrefix, new HashMap<String, HashMap<String, SourceCard>>());
                        }
                        
                        HashMap<String, HashMap<String, SourceCard>> collectionMap = map.get(dbPrefix);
                        
                        String sagaStringIdentifier = EnumTools.convertMappedCharsJsonIdentifier(saga.toString());
                        
                        if(collectionMap.get(sagaStringIdentifier) == null) {
                            collectionMap.put(sagaStringIdentifier, new HashMap<String, SourceCard>());
                        }
                        
                        HashMap<String, SourceCard> sagaCards = collectionMap.get(sagaStringIdentifier);
                        
                        sagaCards.put(c.number, c);
                    }
                }
            } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
                Logger.getLogger(SourceCardDLO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return map;
    }

    public HashMap<Integer, SourceCard> getSourceCardHashMapById() {
        HashMap<Integer, SourceCard> map = new HashMap<>();
        List<SourceCard> list = this.getSourceCardList();

        for (SourceCard c : list) {
            map.put(c.id, c);
        }

        return map;
    }

    public List<SourceCard> getSourceCardList() {
        return dao.getSourceCardList();
    }

    public SourceCard getSourceCardById(Integer id) {
        return dao.getSourceCardById(id);
    }
    
    public SourceCard getSourceCardByNumber(CollectionType type, String cardNumber) {
        return dao.getSourceCardByNumber(type, cardNumber);
    }
    
    public void readJSFiles() {
        try {
            dao.readJavascriptFiles();
        } catch (Exception ex) {
            Logger.getLogger(SourceCardDLO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
