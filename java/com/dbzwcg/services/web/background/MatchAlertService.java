/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.web.background;

import com.dbzwcg.model.match.MatchDLO;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTable;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTableDLO;
import com.dbzwcg.model.match.queues.QueueReadyAlert;
import com.dbzwcg.model.match.queues.QueueReadyAnswer;
import com.dbzwcg.model.match.queues.QueuedPlayer;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.services.web.mvc.controllers.GameController;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import java.lang.reflect.Field;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@EnableScheduling
@Service
public class MatchAlertService {

    private static final List<QueueReadyAlert> alerts = new ArrayList<>();
    public static final Integer timeLimit = 35000;

    private @Autowired
    MatchDLO matchDLO;
    
    private @Autowired
    MatchQueueService queueService;

    private @Autowired
    SimpMessagingTemplate template;

    @Scheduled(fixedDelay = 1000)
    public void checkQueue() {
        purgeAlerts();
        // check finishedAlerts list to start matches and send messages
    }

    public static boolean checkPlayerWithAlerts(User player) {
        boolean ret = false;

        for (Iterator<QueueReadyAlert> it1 = alerts.iterator(); it1.hasNext() && !ret;) {
            QueueReadyAlert alert = it1.next();
            for (Iterator<QueueReadyAnswer> it2 = alert.getAnswers().iterator(); it2.hasNext() && !ret;) {
                QueueReadyAnswer answer = it2.next();
                if (answer.getPlayer().getPlayer().getId().equals(player.getId())) {
                    ret = true;
                }
            }
        }

        return ret;
    }

    private void requeueWillingPlayers(QueueReadyAlert alert) {
        List<QueueReadyAnswer> answers = alert.getAnswers();
        for (Iterator<QueueReadyAnswer> it = answers.iterator(); it.hasNext();) {
            QueueReadyAnswer answer = it.next();
            if (answer.getAnswer() == true && !(answer.getPlayer().getPlayer() instanceof AIPlayer)) {
                queueService.requeuePlayer(answer.getPlayer());
            }
        }
    }

    private static boolean checkPlayersReady(QueueReadyAlert alert) {
        boolean ret = true;
        List<QueueReadyAnswer> answers = alert.getAnswers();
        for (Iterator<QueueReadyAnswer> it = answers.iterator(); it.hasNext() && ret;) {
            QueueReadyAnswer answer = it.next();
            if (answer.getAnswer() == null) {
                ret = false;
            }
        }
        return ret;
    }

    private void broadcastResult(List<QueueReadyAnswer> answers, boolean matchResult) {
        for (QueueReadyAnswer answer : answers) {
            if (!(answer.getPlayer().getPlayer() instanceof AIPlayer) && answer.getAnswer() != false) {
                String userEmail = UserDLO.getUserEmail(answer.getPlayer().getPlayer());
                template.convertAndSendToUser(userEmail, GameController.MATCH_ALERT_FEEDBACK, matchResult);
            }
        }
    }

    private MatchType narrowType(QueueReadyAlert alert) {
        MatchType type = MatchType.PLAYERS;
        for (Iterator<QueueReadyAnswer> it = alert.getAnswers().iterator(); it.hasNext() && type == MatchType.PLAYERS;) {
            QueueReadyAnswer answer = it.next();
            if (answer.getPlayer().getPlayer() instanceof AIPlayer) {
                type = (MatchType) answer.getPlayer().getTypes().toArray()[0];
            }
        }
        return type;
    }

    private Collection<CollectionType> narrowValidCollections(QueueReadyAlert alert) {
        return alert.getAnswers().get(0).getPlayer().getValidCollections();
    }

    private PhysicalAttackTable narrowPhysicalAttackTable(QueueReadyAlert alert) {
        return PhysicalAttackTableDLO.getAttackTableFromType(alert.getAnswers().get(0).getPlayer().getPat());
    }

    private void finishAlert(QueueReadyAlert alert) {
        if (alerts.remove(alert)) {
            boolean matchReady = true;
            for (Iterator<QueueReadyAnswer> it = alert.getAnswers().iterator(); it.hasNext() && matchReady;) {
                QueueReadyAnswer answer = it.next();
                if (answer.getAnswer() == false) {
                    matchReady = false;
                }
            }

            if (matchReady) {
                Integer matchId = matchDLO.startMatch(narrowPhysicalAttackTable(alert), narrowType(alert), narrowValidCollections(alert), alert.getAnswers());
            } else {
                requeueWillingPlayers(alert);
            }

            broadcastResult(alert.getAnswers(), matchReady);
        }
    }

    private void purgeAlerts() {
        for (QueueReadyAlert alert : alerts) {
            Long t = System.currentTimeMillis() - alert.getTimestamp();
            boolean expired = t > timeLimit;
            boolean playersReady = !expired ? checkPlayersReady(alert) : false;
            if (expired || playersReady) {
                finishAlert(alert);
            }
        }
    }

    @Async
    public void createAlert(List<QueuedPlayer> players) {
        QueueReadyAlert qra = new QueueReadyAlert();
        List<QueueReadyAnswer> answers = new ArrayList<>();
        qra.setAnswers(answers);
        for (QueuedPlayer p : players) {
            QueueReadyAnswer answer = new QueueReadyAnswer();
            if (p.getPlayer() instanceof AIPlayer) {
                answer.setAnswer(true);
            } else {
                try {
                    Field email = User.class.getDeclaredField("email");
                    email.setAccessible(true);
                    gameReady((String) email.get(p.getPlayer()));
                } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
                    Logger.getLogger(MatchQueueService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            answer.setPlayer(p);
            answers.add(answer);
        }
        alerts.add(qra);
    }

    @Async
    private void gameReady(String email) {
        this.template.convertAndSendToUser(email, GameController.MATCH_ALERT_QUEUE_READY, true);
    }

    @Async
    public void answerAlert(Principal principal, Boolean playerAnswer) {
        boolean found = false;
        for (Iterator<QueueReadyAlert> it = alerts.iterator(); it.hasNext() && !found;) {
            QueueReadyAlert alert = it.next();
            for (int i = 0; i < alert.getAnswers().size() && !found; i++) {
                QueueReadyAnswer answer = alert.getAnswers().get(i);
                String userEmail = UserDLO.getUserEmail(answer.getPlayer().getPlayer());
                if (userEmail.equals(principal.getName())) {
                    found = true;
                    answer.setAnswer(playerAnswer);
                    if (!playerAnswer || checkPlayersReady(alert)) {
                        finishAlert(alert);
                    }
                }
            }
        }
    }
}
