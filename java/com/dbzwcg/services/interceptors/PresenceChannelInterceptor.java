/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.services.interceptors;

import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.match.players.MatchPlayerDLO;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.services.authentication.CustomAuthService;
import com.dbzwcg.model.users.user.UserDLO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.stereotype.Component;

/**
 *
 * @author csiqueira
 */
@Component
public class PresenceChannelInterceptor extends ChannelInterceptorAdapter {
 
    @Autowired
    private MatchPlayerDLO matchPlayerDLO;
    
    @Override
    public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
 
        // ignore non-STOMP messages like heartbeat messages
        if(sha.getCommand() == null) {
            return;
        }
 
        //String sessionId = sha.getSessionId();
        Player p = (Player) CustomAuthService.getUserFromSecurityContext(sha);
        
        switch(sha.getCommand()) {
            case CONNECT:
                UserDLO.setPlayerOnline(p);
                break;
            case DISCONNECT:
                UserDLO.setPlayerOffline(p);
                MatchPlayer matchPlayer = matchPlayerDLO.getActiveMatchPlayer(p);
                if(matchPlayer != null) {
                    matchPlayerDLO.setPlayerDisconnected(matchPlayer);
                }
        }
    }
}