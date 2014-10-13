/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.cards.sourcecards;

import com.dbzwcg.model.cards.sourcecards.dragonballs.DragonBallCard;
import com.dbzwcg.tools.DBZCCGCompiler;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.types.CardType;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.DragonBallType;
import com.dbzwcg.types.PersonalityType;
import com.dbzwcg.types.RarityType;
import com.dbzwcg.types.StyleType;
import com.dbzwcg.types.sagas.CollectibleCardGameSagaType;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import javax.script.ScriptException;
import org.apache.commons.io.FileUtils;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.UniqueTag;
import org.springframework.stereotype.Repository;

/**
 *
 * @author csiqueira
 */
@Repository
class SourceCardDAO {

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    public static String baseFolder = "C:\\Users\\csiqueira\\Documents\\NetBeansProjects\\DBZWCG\\src\\main\\webapp";
    public static String[] listSagaFiles = {"game\\SaiyanSaga.js"};
    public static String[] blackListJavascriptCardNumber = {"Foil"};

    private <T> Set fromNativeArrayToSet(Object src, Class<T> type, String pkg) {
        Set<T> list = null;

        if (src instanceof NativeArray && (type.isEnum() || type == Enum.class)) {
            list = new HashSet<>();

            NativeArray array = (NativeArray) src;
            Object[] ids = array.getIds();
            for (int i = 0; i < ids.length; i++) {
                if (ids[i] instanceof Integer) {
                    Object o = array.get((Integer) ids[i], (Scriptable) array);
                    // Get as ordinal
                    if (o instanceof Double) {
                        Enum enm;
                        if (pkg != null) {
                            enm = EnumTools.getEnumTypeFromPackage(((Double) o).intValue(), pkg);
                        } else {
                            enm = (Enum) type.getEnumConstants()[((Double) o).intValue()];
                        }

                        list.add((T) enm);
                    }
                }
            }
        }

        return list;
    }

    private <T> List fromNativeArrayToList(Object src, Class<T> type, String pkg) {
        List<T> list = null;

        if (src instanceof NativeArray && (type.isEnum() || type == Enum.class)) {
            list = new ArrayList<>();
            NativeArray array = (NativeArray) src;
            Object[] ids = array.getIds();
            for (int i = 0; i < ids.length; i++) {
                if (ids[i] instanceof Integer) {
                    Object o = array.get((Integer) ids[i], (Scriptable) array);
                    // Get as ordinal
                    if (o instanceof Double) {
                        Enum enm;
                        if (pkg != null) {
                            enm = EnumTools.getEnumTypeFromPackage(((Double) o).intValue(), pkg);
                        } else {
                            enm = (Enum) type.getEnumConstants()[((Double) o).intValue()];
                        }

                        list.add((T) enm);
                    }
                }
            }
        }

        return list;
    }

    void readJavascriptFiles() throws IOException, ScriptException, Exception {
        Context c = Context.enter();
        c.setOptimizationLevel(-1);

        Scriptable scope = c.initStandardObjects();
        String initializer = FileUtils.readFileToString(new File(DBZCCGCompiler.baseFolder + File.separator + "game\\Initializer.js"));
        String types = FileUtils.readFileToString(new File(DBZCCGCompiler.baseFolder + File.separator + "game\\Types.js"));
        String cards = FileUtils.readFileToString(new File(DBZCCGCompiler.baseFolder + File.separator + "game\\SaiyanSaga.js"));

        NativeObject result = (NativeObject) c.evaluateString(scope, initializer + types + cards, "<cmd>", 1, null);

        Scriptable obj = (Scriptable) scope.get("DBZCCG", scope);

        CollectibleCardGameSagaType[] ccgSagas = CollectibleCardGameSagaType.values();

        for (int i = 0; i < ccgSagas.length; i++) {
            String sagaName = EnumTools.convertMappedCharsJsonIdentifier(ccgSagas[i].toString());

            Scriptable saga = (Scriptable) obj.get(sagaName, obj);

            Object[] ids = saga.getIds();

            for (int j = 0; j < ids.length; j++) {
                if (!Arrays.asList(blackListJavascriptCardNumber).contains(ids[j].toString())) {
                    Object card;
                    if (ids[j] instanceof Integer) {
                        card = (Object) saga.get((Integer) ids[j], saga);
                    } else {
                        card = (Object) saga.get((String) ids[j], saga);
                    }

                    if (card instanceof Scriptable) {
                        Scriptable scriptableCard = (Scriptable) card;
                        String name = scriptableCard.get("name", scriptableCard).toString();
                        String number = scriptableCard.get("number", scriptableCard).toString();
                        String description = scriptableCard.get("description", scriptableCard).toString();
                        CardType type = CardType.values()[((Double) scriptableCard.get("type", scriptableCard)).intValue()];
                        StyleType style = StyleType.values()[((Double) scriptableCard.get("style", scriptableCard)).intValue()];
                        Object headshot = scriptableCard.get("headshot", scriptableCard);
                        RarityType rarity = RarityType.values()[((Double) scriptableCard.get("rarity", scriptableCard)).intValue()];
                        CollectibleCardGameSagaType cardSaga = CollectibleCardGameSagaType.values()[((Double) scriptableCard.get("saga", scriptableCard)).intValue()];
                        Object effectType = scriptableCard.get("effectType", scriptableCard);
                        Object id = scriptableCard.get("id", scriptableCard);
                        Object personality = scriptableCard.get("personality", scriptableCard);
                        Object dbCode = scriptableCard.get("dbCode", scriptableCard);
                        Object limit = scriptableCard.get("limit", scriptableCard);

                        SourceCard srcCard;

                        if (dbCode instanceof Double) {
                            srcCard = new DragonBallCard();
                            DragonBallType dbType = DragonBallType.values()[((Double) dbCode).intValue()];
                            ((DragonBallCard) srcCard).setDbCode(dbType);
                        } else {
                            srcCard = new SourceCard();
                        }

                        srcCard.name = name;
                        srcCard.number = number;
                        srcCard.description = description;
                        srcCard.rarity = rarity;
                        srcCard.setSaga(cardSaga);
                        Set<CardType> cardTypes = new TreeSet<>();
                        cardTypes.add(type);
                        srcCard.type = cardTypes;
                        srcCard.style = style;

                        if (id instanceof UniqueTag) {
                            id = null;
                        } else {
                            id = ((Double) id).intValue();
                        }

                        srcCard.id = (Integer) id;

                        if (limit instanceof UniqueTag) {
                            limit = null;
                        } else {
                            limit = ((Double) limit).intValue();
                        }

                        srcCard.cardLimit = (Integer) limit;

                        srcCard.headshots = fromNativeArrayToSet(headshot, PersonalityType.class, null);
                        srcCard.effectTypes = fromNativeArrayToSet(effectType, Enum.class, "com.dbzwcg.types.effects");

                        if (personality instanceof Double) {
                            srcCard.personalities = new TreeSet<>();
                            srcCard.personalities.add(PersonalityType.values()[((Double) personality).intValue()]);
                        } else {
                            srcCard.personalities = fromNativeArrayToSet(personality, PersonalityType.class, null);
                        }

                        em.persist(srcCard);

                    } else {
                        throw new Exception(ids[j].toString() + "Not found");
                    }
                }
            }
        }

        Context.exit();
    }

    List<SourceCard> getSourceCardList() {
        Query query = em.createQuery("select s from SourceCard s");
        List<SourceCard> sourceCards = query.getResultList();
        return sourceCards;
    }

    SourceCard getSourceCardById(Integer id) {
        SourceCard card = null;

        if (id != null) {
            Query q = em.createQuery("SELECT c FROM SourceCard c WHERE c.id = :id", SourceCard.class);
            card = (SourceCard) q.setParameter("id", id).getSingleResult();
        }

        return card;
    }

    SourceCard getSourceCardByNumber(CollectionType type, String number) {
        SourceCard card = null;

        if (type != null && number != null) {
            try {
                Query q = em.createQuery("SELECT c FROM SourceCard c WHERE c.collectionType = :type AND c.number = :number", SourceCard.class);
                card = (SourceCard) q.setParameter("type", type).setParameter("number", number).getSingleResult();
            } catch (NoResultException e) {
            }
        }

        return card;
    }

}
