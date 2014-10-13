/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.players;

import com.dbzwcg.model.users.user.UserDLO;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author csiqueira
 */
@Service
public class PlayerDLO {

    @Autowired
    private PlayerDAO dao;
    
    private static final String EMAIL_PATTERN =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public void updatePoints(Integer playerId, Integer points) {
        dao.updatePoints(playerId, points);
    }
    
    public Player getPlayerFromEmail(String email) {
        return dao.getPlayerFromEmail(email);
    }

    public Player persistPlayerToDatabase(Player player) {
        return dao.persistPlayerToDatabase(player);
    }

    public boolean registerUser(Player usr) {
        boolean ret = false;

        if (usr != null && usr.getId() == null) {
            String email = UserDLO.getUserEmail(usr);
            if (email != null) {
                boolean checkEmail = Pattern.compile(EMAIL_PATTERN).matcher(email).matches();
                if (checkEmail) {
                    Player p = getPlayerFromEmail(usr.getEmail());
                    if (p == null) {
                        persistPlayerToDatabase(usr);
                        ret = true;
                    }
                }
            }
        }

        return ret;
    }
    
    public Boolean checkPlayerInMatch(Player p) {
        return dao.checkPlayerInMatch(p);
    }
}