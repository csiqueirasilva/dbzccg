package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.services.chat.ChatMessage;
import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired private SimpMessagingTemplate template; 

    /* JS: stompClient.send('/app/ws/chat/global', {}, JSON.stringify('Hello stosadmp!')); */
    @MessageMapping("/ws/chat/global")
    @SendTo("/topic/chat")
    public ChatMessage globalChat(Principal principal, String message) {
        if(principal == null) {
            throw new UnsupportedOperationException("No user authenticated");
        }
        User u = UserDLO.getUserFromUsername(principal.getName());
        return new ChatMessage(message, u, null);
    }
    
    /* JS: stompClient.send('/app/ws/chat/private', {toUser: 'roo123t@dbzwcg.com'}, JSON.stringify('Hello stosadmp!')); */
    @MessageMapping("/ws/chat/private")
    public void privateChat(Principal principal, Message<?> message, String body) {
        if(principal == null) {
            throw new UnsupportedOperationException("No user authenticated");
        }
        User fromUser = UserDLO.getUserFromUsername(principal.getName());
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        String target = (String) sha.getNativeHeader("toUser").get(0);
        User toUser = UserDLO.getUserFromUsername(target);
        template.convertAndSendToUser(target, "/topic/chat", new ChatMessage(body, fromUser, toUser));
    }
}