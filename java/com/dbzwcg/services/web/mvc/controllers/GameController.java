package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.queues.QueuedPlayer;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.PlayerDLO;
import com.dbzwcg.services.authentication.CustomAuthService;
import com.dbzwcg.services.configuration.WebMvcConfig;
import com.dbzwcg.services.configuration.WebSocketConfig;
import com.dbzwcg.services.web.background.MatchAlertService;
import com.dbzwcg.services.web.background.MatchQueueService;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.types.PhysicalAttackTableType;
import com.dbzwcg.model.users.user.UserDLO;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author csiqueira
 */
@Controller
@RequestMapping("/game")
public class GameController {
    public static final String MATCH_ALERT_QUEUE_READY = "/topic/game/match/queue/ready";
    public static final String MATCH_JOIN_QUEUE = "/ws/game/match/queue/join";
    public static final String MATCH_ALERT_ANSWER = "/topic/game/match/queue/answer";
    public static final String MATCH_ALERT_FEEDBACK = "/topic/game/match/queue/feedback";
    
    private @Autowired MatchAlertService alertService; 
    private @Autowired MatchQueueService queueService;
    
    @Autowired
    private PlayerDLO playerDLO;

    @Autowired
    private MatchDLO matchDLO;
    
    @RequestMapping(value = "/match/heartbeat")
    public @ResponseBody Map<String, Object> heartbeat (ModelMap map) {
        HashMap<String, Object> ret = new HashMap<>();
        
        return ret;
    }
    
    @Transactional
    @RequestMapping(value = "/match/end")
    public @ResponseBody Map<String, Object> endMatch (ModelMap map) {
        HashMap<String, Object> ret = new HashMap<>();
        
        Player p = (Player) CustomAuthService.getUserFromSecurityContext();
        
        playerDLO.updatePoints(p.getId(), 3);
        
        CustomAuthService.reloadUserDetails();
        
        return ret;
    }
    
    @RequestMapping(value = "/match")
    public String gameMatch(ModelMap map, @RequestParam(value = "idDeck") Integer idDeck) {
        map.addAttribute("content", "/game/demo.jsp");
        map.addAttribute("playerData", idDeck);
        
        return WebMvcConfig.DEFAULT_DISPATCHER_JSP;
    }
    
    @RequestMapping("/matchdata/{idDeck}")
    public @ResponseBody MatchPlayer matchData(ModelMap map, @PathVariable(value = "idDeck") Integer idDeck) {
        MatchPlayer p = null;
        
        //p = MatchDLO.assemblePlayerMatchData(idDeck, (Player) CustomAuthService.getUserFromSecurityContext());
        
        return p;
    }
    
    @Transactional
    @RequestMapping("/find")
    public String findMatch(@RequestParam(required = false) final Boolean contentOnly, ModelMap map) {
        String ret = "/WEB-INF/content/game/findmatch.jsp";
        
        if(contentOnly == null || contentOnly == false) {
            map.addAttribute("content", "/game/findmatch.jsp");
            ret = WebMvcConfig.DEFAULT_DISPATCHER_JSP;
        }

        HashMap<String, CollectionType> collectionTypes = new HashMap<>();
        collectionTypes.put("Collectible Card Game", CollectionType.COLLECTIBLE_CARD_GAME);
        
        HashMap<String, MatchType> matchTypes = new HashMap<>();
        matchTypes.put("AI Mirror", MatchType.AI_MIRROR);
        matchTypes.put("AI Random", MatchType.AI_RANDOM);
        matchTypes.put("Players", MatchType.PLAYERS);

        Integer usersOnline = UserDLO.getNumberOfUsersOnline();
        
        map.addAttribute("pats", PhysicalAttackTableType.values());
        map.addAttribute("matchAlertAnswer", WebSocketConfig.APP_PREFIX + MATCH_ALERT_ANSWER);
        map.addAttribute("queueAlertTimeLimit", (int) (MatchAlertService.timeLimit * 0.95));
        map.addAttribute("matchAlertFeedback", MATCH_ALERT_FEEDBACK);
        map.addAttribute("matchAlertQueueReady", MATCH_ALERT_QUEUE_READY);
        map.addAttribute("matchJoinQueue", WebSocketConfig.APP_PREFIX + MATCH_JOIN_QUEUE);
        map.addAttribute("usersOnline", usersOnline);
        map.addAttribute("collectionTypes", collectionTypes);
        map.addAttribute("matchTypes", matchTypes);
        map.addAttribute("decks", matchDLO.listPlayerDeckEligibility((Player) CustomAuthService.getUserFromSecurityContext()));
        
        return ret;
    }

    @MessageMapping(MATCH_ALERT_ANSWER)
    public void answerQueue(Principal principal, Boolean answer) {
        alertService.answerAlert(principal, answer);
    }
    
    @MessageMapping(MATCH_JOIN_QUEUE)
    public void joinQueue(Principal principal, Message<?> message, QueuedPlayer queued) {
        queueService.addToQueue(message, principal, queued);
    }
    
    @RequestMapping("/album")
    public String album(ModelMap map) {
        map.addAttribute("content", "/game/album.jsp");
        return WebMvcConfig.DEFAULT_DISPATCHER_JSP;
    }
    
    @RequestMapping("/demo")
    public String index(ModelMap map) {
        map.addAttribute("content", "/game/demo.jsp");
        return WebMvcConfig.DEFAULT_DISPATCHER_JSP;
    }
}