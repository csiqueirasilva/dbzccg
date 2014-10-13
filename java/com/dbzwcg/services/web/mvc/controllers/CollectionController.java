package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.cards.instancedcards.InstancedCardDLO;
import com.dbzwcg.model.cards.proxycards.ProxyCard;
import com.dbzwcg.model.cards.proxycards.ProxyCardDLO;
import com.dbzwcg.model.cards.sourcecards.SourceCard;
import com.dbzwcg.model.cards.sourcecards.SourceCardDLO;
import com.dbzwcg.model.decks.Deck;
import com.dbzwcg.model.decks.DeckDLO;
import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.services.authentication.CustomAuthService;
import com.dbzwcg.services.configuration.WebMvcConfig;
import com.dbzwcg.model.users.user.User;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import javax.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author csiqueira
 */
@Controller
@RequestMapping("collection/")
@Transactional
public class CollectionController {

    @Autowired
    private SourceCardDLO sourceCardDLO;

    @Autowired
    private ProxyCardDLO proxyCardDLO;

    @Autowired
    private DeckDLO deckDLO;

    @Autowired
    private MatchDLO matchDLO;

    @Autowired
    private InstancedCardDLO instancedCardDLO;
    
    @RequestMapping("card/source")
    public @ResponseBody
    HashMap<String, HashMap<String, HashMap<String, SourceCard>>> getSourceCardMap() {
        return sourceCardDLO.getSourceCardHashMapBySagaNumber();
    }

    @RequestMapping("card/proxies")
    public @ResponseBody
    List<ProxyCard> getProxyList() {
        return proxyCardDLO.getProxyCards();
    }

    @RequestMapping("card/proxies/{id}")
    public @ResponseBody
    ProxyCard getProxyCardBySourceId(@PathVariable(value = "id") Integer cardId) {
        return proxyCardDLO.getProxyCardBySourceId(cardId);
    }

    @RequestMapping("card/instance/{id}")
    public @ResponseBody
    InstancedCard getInstancedCard(@PathVariable(value = "id") Integer cardId) {
        return instancedCardDLO.getInstancedCardById(cardId);
    }

    @RequestMapping("card/source/{id}")
    public @ResponseBody
    SourceCard getCard(@PathVariable(value = "id") Integer cardId) {
        return sourceCardDLO.getSourceCardById(cardId);
    }

    @RequestMapping("get")
    public @ResponseBody
    List<InstancedCard> getCollection() {
        User u = CustomAuthService.getUserFromSecurityContext();
        return instancedCardDLO.getCollectionByUser(u);
    }

    @RequestMapping("decks/remove")
    public @ResponseBody
    boolean deckBuildRemove(@RequestParam("id") Integer id) {
        boolean ret = false;

        if (id != null) {
            Player p = (Player) CustomAuthService.getUserFromSecurityContext();
            ret = deckDLO.removeDeckById(p, id);
        }

        return ret;
    }

    @RequestMapping("decks/register")
    public String publicDeckBuilder(ModelMap map, @RequestParam(value = "d", defaultValue = "") String encodedData) {
        Player p = (Player) CustomAuthService.getUserFromSecurityContext();
        Deck checkDeck = deckDLO.checkUserJsonDeck(p, encodedData);

        if (checkDeck == null || p == null) {
            if (checkDeck == null) {
                checkDeck = new Deck();
                checkDeck.setDisplayName("Unnamed Deck");
            }
            map.addAttribute("publicContent", true);
        }

        String stringfied = deckDLO.getDeckBuildJson(checkDeck);

        map.addAttribute("deck", checkDeck);
        map.addAttribute("jsonDeck", stringfied);

        return "/WEB-INF/content/collection/registerdecks.jsp";
    }

    @RequestMapping("decks/view/{id}")
    public String viewDecks(@RequestParam(required = false) final Boolean contentOnly, ModelMap map, @PathVariable(value = "id") Integer id) {
        Deck d;
        try {
            d = deckDLO.getDeckById(id);
        } catch (NoResultException ex) {
            d = null;
        }

        String ret = WebMvcConfig.setContentOnly(contentOnly, "/WEB-INF/content/collection/viewdecks.jsp", map);
        User u = CustomAuthService.getUserFromSecurityContext();
        Boolean owner = false;

        if (d != null && Objects.equals(u.getId(), d.getOwner().getId())) {
            owner = true;
        } else if (d == null) {
            map.addAttribute("error", WebMvcConfig.DEFAULT_MISSING_ERROR.replace("%msg%", "Deck ID").replace("%resource%", "NULL"));
            ret = WebMvcConfig.DEFAULT_MISSING_PAGE;
        }

        map.addAttribute("deck", d);
        map.addAttribute("jsonDeck", deckDLO.getDeckBuildJson(d));
        map.addAttribute("recentMatches", matchDLO.getRecentMatches(d));
        map.addAttribute("matchStats", matchDLO.getWinRate(d));
        map.addAttribute("owner", owner);

        return ret;
    }

    @RequestMapping("decks/register/{id}")
    public String decks(ModelMap map, @PathVariable(value = "id") Integer id) {
        map.addAttribute("content", "/collection/registerdecks.jsp");
        Deck d;
        try {
            d = deckDLO.getDeckById(id);
        } catch (NoResultException ex) {
            d = null;
        }

        String ret = "/WEB-INF/content/collection/registerdecks.jsp";
        User u = CustomAuthService.getUserFromSecurityContext();

        if (d != null && Objects.equals(u.getId(), d.getOwner().getId())) {
            map.addAttribute("deck", d);
            map.addAttribute("jsonDeck", deckDLO.getDeckBuildJson(d));
        } else {
            if (id != null) {
                map.addAttribute("error", WebMvcConfig.DEFAULT_MISSING_ERROR.replace("%msg%", "Deck ID").replace("%resource%", id.toString()));
            } else if (!Objects.equals(u.getId(), d.getOwner().getId())) {
                map.addAttribute("error", WebMvcConfig.DEFAULT_MISSING_ERROR.replace("%msg%", "Permission").replace("%resource%", "DENIED"));
            } else {
                map.addAttribute("error", WebMvcConfig.DEFAULT_MISSING_ERROR.replace("%msg%", "Deck ID").replace("%resource%", "NULL"));
            }

            ret = WebMvcConfig.DEFAULT_MISSING_PAGE;
        }
        return ret;
    }

    @RequestMapping("decks")
    public String decks(@RequestParam(required = false) final Boolean contentOnly, ModelMap map) {
        String ret = "/WEB-INF/content/collection/decks.jsp";

        if (contentOnly == null || contentOnly == false) {
            map.addAttribute("content", "/collection/decks.jsp");
            ret = WebMvcConfig.DEFAULT_DISPATCHER_JSP;
        }

        map.addAttribute("decks", matchDLO.listPlayerDeckEligibility((Player) CustomAuthService.getUserFromSecurityContext()));

        return ret;
    }

    @RequestMapping(value = "decks/save", method = RequestMethod.POST)
    public @ResponseBody
    boolean saveDeck(@RequestParam("d") String encodedData) {
        return deckDLO.persistJsonEncodedDeck((Player) CustomAuthService.getUserFromSecurityContext(), encodedData);
    }

    @RequestMapping(value = "decks/create", method = RequestMethod.POST)
    public @ResponseBody
    Deck createDecks(@RequestParam("uid") Integer uid, ModelMap map) {
        User u = CustomAuthService.getUserFromSecurityContext();
        Deck d = deckDLO.createDeckByUser(u);
        return d;
    }
}
