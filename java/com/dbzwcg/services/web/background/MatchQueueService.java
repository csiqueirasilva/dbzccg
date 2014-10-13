/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.web.background;

import com.dbzwcg.model.decks.Deck;
import com.dbzwcg.model.decks.DeckDLO;
import com.dbzwcg.model.match.queues.QueuedPlayer;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.PlayerDLO;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.model.players.ai.AIPlayerDLO;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.model.users.user.User;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Queue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
@EnableScheduling
public class MatchQueueService {

    private @Autowired
    DeckDLO deckDLO;

    private @Autowired
    PlayerDLO playerDLO;

    private static final Queue<QueuedPlayer> users = new LinkedList<>();
    private static AIPlayer aiPlayer = null;
    private @Autowired
    SimpMessagingTemplate template;
    private @Autowired
    MatchAlertService alertService;

    @Scheduled(fixedRate = 2000)
    public void checkQueue() {
        QueuedPlayer p = users.poll();
        if (p != null) {
            QueuedPlayer pair = this.checkPair(p);
            if (pair != null) {
                List<QueuedPlayer> matchPlayers = new ArrayList<>();
                matchPlayers.add(p);
                matchPlayers.add(pair);
                alertService.createAlert(matchPlayers);
            }
        }
    }

    private QueuedPlayer getMatchingUser(QueuedPlayer sourcePlayer) {
        for (QueuedPlayer p : users) {
            if (p.getTypes().contains(MatchType.PLAYERS) && sourcePlayer.getPat().equals(p.getPat()) && p.getValidCollections().equals(sourcePlayer.getValidCollections())) {
                users.remove(p);
                return p;
            }
        }
        return null;
    }

    private QueuedPlayer createAIPlayer(QueuedPlayer p) {
        QueuedPlayer ret = new QueuedPlayer();
        if (aiPlayer == null) {
            aiPlayer = (AIPlayer) playerDLO.getPlayerFromEmail(AIPlayerDLO.AI_USER_EMAIL);
        }
        ret.setPlayer(aiPlayer);
        ret.setPat(p.getPat());
        List<MatchType> types = new ArrayList<>();
        ret.setTypes(types);
        ret.setValidCollections(p.getValidCollections());

        if (p.getTypes().contains(MatchType.AI_MIRROR) && p.getTypes().contains(MatchType.AI_RANDOM)) {
            ret.setDeck(null); // NYI
            types.add(null); // NYI
        } else if (p.getTypes().contains(MatchType.AI_RANDOM)) {
            ret.setDeck(null); // NYI
            types.add(MatchType.AI_RANDOM);
        } else if (p.getTypes().contains(MatchType.AI_MIRROR)) {
            ret.setDeck(p.getDeck());
            types.add(MatchType.AI_MIRROR);
        }
        return ret;
    }

    private QueuedPlayer checkPair(QueuedPlayer p) {
        QueuedPlayer ret = null;

        p.setNumberOfTries((short) (p.getNumberOfTries() + 1));

        if (p.getTypes().contains(MatchType.PLAYERS)) {
            ret = getMatchingUser(p);
            if (ret == null) {
                if (p.getTypes().size() == 1) {
                    // requeue
                    users.add(p);
                } else if (Objects.equals(p.getNumberOfTries(), QueuedPlayer.MAX_NUMBER_OF_TRIES)) {
                    ret = createAIPlayer(p);
                }
            }
        } else {
            ret = createAIPlayer(p);
        }

        return ret;
    }

    private boolean userInQueue(User u) {
        for (QueuedPlayer q : users) {
            if (q.getPlayer().equals(u)) {
                return true;
            }
        }
        return false;
    }

    @Async
    public void requeuePlayer(QueuedPlayer queued) {
        if (!users.contains(queued) && !(queued.getPlayer() instanceof AIPlayer)) {
            users.add(queued);
        }
    }

    private boolean resolveDeckEligibility(Deck d, Collection<CollectionType> collections) {
        boolean ret = true;
        for (Iterator<CollectionType> it = collections.iterator(); it.hasNext() && ret;) {
            CollectionType type = it.next();
            ret = deckDLO.checkDeckPlayable(d, type);
        }
        return ret;
    }

    @Async
    public void addToQueue(Message<?> message, Principal principal, QueuedPlayer queued) {
        if (message != null && principal != null && queued != null) {
            StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
            Player player = playerDLO.getPlayerFromEmail(principal.getName());
            if (player != null && !userInQueue(player) && !MatchAlertService.checkPlayerWithAlerts(player) && !playerDLO.checkPlayerInMatch(player)) {
                if (queued.getValidCollections().size() > 0 && queued.getTypes().size() > 0 && queued.getPat() != null) {
                    List<String> parse = sha.getNativeHeader("deckId");
                    if (parse.size() == 1) {
                        Deck d = deckDLO.getDeckById(Integer.parseInt(parse.get(0)));
                        if (d.getOwner().getId().equals(player.getId()) && resolveDeckEligibility(d, queued.getValidCollections())) {
                            queued.setPlayer((Player) d.getOwner());
                            queued.setDeck(d);
                            users.add(queued);
                        }
                    }
                }
            }
        }
    }
}
