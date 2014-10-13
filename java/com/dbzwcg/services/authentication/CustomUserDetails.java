/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.authentication;

import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import java.util.ArrayList;
import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author csiqueira
 */
public class CustomUserDetails extends org.springframework.security.core.userdetails.User {

    private String displayName;
    private Integer points;
    private Integer gameId;
    
    public Integer getPoints() {
        return this.points;
    }
    
    public String getDisplayName() {
        return this.displayName;
    }

    public Integer getGameId() {
        return this.gameId;
    }
    
    public CustomUserDetails(User u) {
        super(UserDLO.getUserEmail(u), UserDLO.getUserPassword(u), u.getEnable(), true, true, true, 
                new ArrayList<GrantedAuthority>());
        Player p = (Player) u;
        
        this.displayName = p.getDisplayName();
        this.points = p.getPoints();
        this.gameId = u.getId();
    }
}