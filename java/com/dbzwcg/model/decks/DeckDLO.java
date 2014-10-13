/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.decks;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.proxycards.ProxyCard;
import com.dbzwcg.model.cards.proxycards.ProxyCardDLO;
import com.dbzwcg.model.cards.sourcecards.personalities.PersonalityCard;
import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.LimitType;
import com.dbzwcg.model.users.user.User;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import org.postgresql.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class DeckDLO {

    @Autowired
    private DeckDAO dao;
    
    @Autowired
    private ProxyCardDLO proxyCardDLO;
    
    public boolean checkDeckPlayable(Deck d, CollectionType type) {
        boolean ret = true;

        switch (type) {
            case COLLECTIBLE_CARD_GAME:
                if (d == null) {
                    ret = false;
                } else if (d.getCards() == null) {
                    ret = false;
                } else if (d.getMainPersonality() == null) {
                    ret = false;
                } else if ((d.getCards().size() + d.getMainPersonality().size()) < LimitType.DECK_MIN_DEFAULT_SIZE.getValue()) {
                    ret = false;
                } else if ((d.getCards().size() + d.getMainPersonality().size()) > LimitType.DECK_MAX_DEFAULT_SIZE.getValue()) {
                    ret = false;
                } else if ((d.getMainPersonality().size() < LimitType.LEVEL_QTT_MIN.getValue())) {
                    ret = false;
                } else if ((d.getMainPersonality().size() > LimitType.LEVEL_QTT_MAX.getValue())) {
                    ret = false;
                }

                // check main personality levels
                if (d != null && d.getMainPersonality() != null) {
                    int currentLevel = LimitType.LEVEL_MIN.getValue();
                    while (currentLevel != d.getMainPersonality().size()) {
                        boolean check = false;
                        for (int i = 0; i < d.getMainPersonality().size() && !check; i++) {
                            if (((PersonalityCard) d.getMainPersonality().get(i).getSourceCard()).getPersonalityLevel() == currentLevel) {
                                currentLevel++;
                                check = true;
                            }
                        }

                        if (!check) {
                            ret = false;
                            break;
                        }
                    }
                }
            break;
            default:
                ret = false;
        }

        return ret;
    }

    public boolean persistJsonEncodedDeck(User owner, String encodedData) {
        boolean ret = false;

        Deck checkDeck = this.checkUserJsonDeck(owner, encodedData);

        if (checkDeck != null) {
            dao.updateDeck(checkDeck);
            ret = true;
        }

        return ret;
    }

    public boolean removeDeckById(User owner, Integer id) {
        return dao.removeDeckById(owner, id);
    }

    public Deck createDeckByUser(User u) {
        return dao.createDeckByUser(u);
    }

    public List<Deck> getDecksByUser(User u) {
        return dao.getDecksByUser(u);
    }

    public Deck getDeckById(Integer id) {
        return dao.getDeckById(id);
    }

    public Deck checkUserJsonDeck(User owner, String encodedJson) {
        Deck d = null;
        Deck checkDeck = null;

        if (encodedJson != null && !encodedJson.equals("")) {
            byte[] b = Base64.decode(encodedJson);
            DeckJsonReference deckReference = new Gson().fromJson(new String(b), DeckJsonReference.class
            );
            if (deckReference.getId()
                    != null && owner != null) {
                checkDeck = this.getDeckById(deckReference.getId());
                if (!checkDeck.getOwner().getEmail().equals(owner.getEmail())) {
                    d = null;
                } else {
                    d = new Deck();
                    d.setOwner(owner);
                    d.setId(checkDeck.getId());
                }
            } else {
                d = new Deck();
            }

            if (d != null) {
                d.setDisplayName(deckReference.getName());
                if (deckReference.getAlignment() != null) {
                    d.setAlignment(AlignmentType.values()[deckReference.getAlignment()]);
                }

                if (deckReference.getMainPersonality() != null) {
                    d.setMainPersonality(new ArrayList<InstancedCard>());
                    for (int i = 0; i < deckReference.getMainPersonality().size(); i++) {
                        for (int j = 0; j < deckReference.getMainPersonality().get(i).getQtt(); j++) {
                            if (deckReference.getMainPersonality().get(i).getProxy()) {
                                ProxyCard c = proxyCardDLO.getProxyCardBySourceId(deckReference.getMainPersonality().get(i).getId());
                                c.setOwner(owner);
                                d.getMainPersonality().add(c);
                            } else {
                                // get a matching card from the player collection
                                // check for invalid matches, like when the player doesnt have the specified card in his collection
                            }
                        }
                    }
                }

                if (deckReference.getCards() != null) {
                    d.setCards(new ArrayList<InstancedCard>());
                    for (int i = 0; i < deckReference.getCards().size(); i++) {
                        for (int j = 0; j < deckReference.getCards().get(i).getQtt(); j++) {
                            if (deckReference.getCards().get(i).getProxy()) {
                                ProxyCard c = proxyCardDLO.getProxyCardBySourceId(deckReference.getCards().get(i).getId());
                                c.setOwner(owner);
                                d.getCards().add(c);
                            } else {
                                // get a matching card from the player collection
                                // check for invalid matches, like when the player doesnt have the specified card in his collection
                            }
                        }
                    }
                }
            }
        }

        return d;
    }

    public String getDeckBuildJson(Deck d) {
        String json = null;

        if (d != null) {
            DeckJsonReference deckReference = new DeckJsonReference();
            if (d.getCards() != null) {
                deckReference.setCards(new ArrayList<CardInDeckJsonReference>());
                for (int i = 0; i < d.getCards().size(); i++) {
                    boolean createNew = true;
                    int j = 0;
                    for (; j < deckReference.getCards().size(); j++) {
                        int refId = deckReference.getCards().get(j).getId();
                        int sourceCardId = d.getCards().get(i).getSourceCard().getId();
                        if (refId == sourceCardId) {
                            if (deckReference.getCards().get(j).getFoil() == d.getCards().get(i).getFoil()) {
                                if ((deckReference.getCards().get(j).getProxy()
                                        && d.getCards().get(i) instanceof ProxyCard)
                                        || (!deckReference.getCards().get(j).getProxy()
                                        && !(d.getCards().get(i) instanceof ProxyCard))) {
                                    createNew = false;
                                    break;
                                }
                            }
                        }
                    }

                    if (createNew) {
                        deckReference.getCards().add(new CardInDeckJsonReference());
                        deckReference.getCards().get(j).setQtt(0);
                        deckReference.getCards().get(j).setId(d.getCards().get(i).getSourceCard().getId());
                        deckReference.getCards().get(j).setFoil(d.getCards().get(i).getFoil());
                        deckReference.getCards().get(j).setProxy(d.getCards().get(i) instanceof ProxyCard);
                    }

                    deckReference.getCards().get(j).setQtt(deckReference.getCards().get(j).getQtt() + 1);
                }
            }

            if (d.getMainPersonality() != null) {
                deckReference.setMainPersonality(new ArrayList<CardInDeckJsonReference>());
                for (int i = 0; i < d.getMainPersonality().size(); i++) {
                    deckReference.getMainPersonality().add(new CardInDeckJsonReference());
                    deckReference.getMainPersonality().get(i).setQtt(1);
                    deckReference.getMainPersonality().get(i).setId(d.getMainPersonality().get(i).getSourceCard().getId());
                    deckReference.getMainPersonality().get(i).setFoil(d.getMainPersonality().get(i).getFoil());
                    deckReference.getMainPersonality().get(i).setProxy(d.getMainPersonality().get(i) instanceof ProxyCard);
                }
            }

            deckReference.setName(d.getDisplayName());
            deckReference.setAlignment(d.getAlignment() != null ? d.getAlignment().ordinal() : null);

            String jsonString = new Gson().toJson(deckReference);

            json = Base64.encodeBytes(jsonString.getBytes(), Base64.DONT_BREAK_LINES);
        }

        return json;
    }
}
