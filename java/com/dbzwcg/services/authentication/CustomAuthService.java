package com.dbzwcg.services.authentication;

import com.dbzwcg.model.users.user.User;
import com.dbzwcg.model.users.user.UserDLO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service("customUserDetailsService")
public class CustomAuthService implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    public static User getUserFromSecurityContext(StompHeaderAccessor sha) {
        Authentication auth = ((UsernamePasswordAuthenticationToken) sha.getHeader("simpUser"));
        return getUserFromSecurityContext(auth);
    }
    
    public static User getUserFromSecurityContext() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return getUserFromSecurityContext(auth);
    }
    
    public String encodePassword (String username, String password) {
        String ret = passwordEncoder.encode(password);
        return ret;
    }
    
    public static void reloadUserDetails() {
        User user = CustomAuthService.getUserFromSecurityContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(UserDLO.getAuthUserDetails(UserDLO.getUserEmail(user)), UserDLO.getUserPassword(user), user.getRoles());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    
    private static User getUserFromSecurityContext(Authentication auth) {
        String name = auth.getName();
        User usr = UserDLO.getUserFromUsername(name);
        return usr;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUserDetails ud = UserDLO.getAuthUserDetails(username);
        
        if (ud == null) {
            throw new UsernameNotFoundException("User " + username + " not found");
        }

        return ud;
    }
}