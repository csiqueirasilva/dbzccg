package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.PlayerDLO;
import com.dbzwcg.model.users.authority.Authority;
import com.dbzwcg.model.users.authority.AuthorityDLO;
import com.dbzwcg.model.users.authority.AuthorityType;
import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import java.util.HashMap;
import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author csiqueira
 */
@Controller
@RequestMapping(value = "/auth")
public class AuthController {
    
    @Autowired
    private PlayerDLO playerDLO;
    
    @Autowired
    BCryptPasswordEncoder pwEncoder;
    
    @RequestMapping(value = "/login")
    public @ResponseBody
    Boolean login(ModelMap map) {
        return true;
    }

    @RequestMapping(value = "/logout")
    public @ResponseBody
    Boolean logout(ModelMap map) {
        return true;
    }

    @RequestMapping(value = "/denied")
    public @ResponseBody Boolean denied(ModelMap map) {
        return false;
    }
    
    @Transactional
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public @ResponseBody
    HashMap<String, Object> signup(ModelMap map,
        @RequestParam("email") String email, 
        @RequestParam("password") String password,
        @RequestParam("cPassword") String cPassword, 
        @RequestParam("displayName") String displayName) {
        HashMap<String, Object> retMap = new HashMap<String, Object>();
        boolean ret = false;
        
        
        if(email.equals("") || password.equals("") || cPassword.equals("") || displayName.equals("")) {
            retMap.put("error", "All fields are required");
        } else if(cPassword.equals(password)) {
            User u = UserDLO.getUserFromUsername(email);
            
            if(u == null) {
                String loweredEmail = email.toLowerCase();
                Player usr = new Player();
                usr.setDisplayName(displayName);
                usr.setEmail(loweredEmail);
                usr.setRoles(new HashSet<Authority>());
                usr.setEnable(true);
                usr.getRoles().add(AuthorityDLO.getAuthorityByType(AuthorityType.ROLE_PLAYER));
                String encodedPassword = pwEncoder.encode(password);
                usr.setPassword(encodedPassword);
                usr.setPoints(0);
                ret = playerDLO.registerUser(usr);
            } else {
                retMap.put("error", "Email already in use.");
            }
        } else {
            retMap.put("error", "Password does not match.");
        }
        
        retMap.put("success", ret);
        
        return retMap;
    }
}