package com.dbzwcg.services.configuration;

import com.dbzwcg.services.authentication.CustomAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebMvcSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(new CustomAuthService()).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/lib/**").permitAll()
                    .antMatchers("/css/**").permitAll()
                    .antMatchers("/images/**").permitAll()
                    .antMatchers("/build/**").permitAll()
                    .antMatchers("/model/**").permitAll()
                    .antMatchers("/game/lib/**").permitAll()
                    .antMatchers("/game/model/**").permitAll()
                    .antMatchers("/game/images/**").permitAll()
                    .antMatchers("/game/demo").permitAll()
                    .antMatchers("/game/album").permitAll()
                    .antMatchers("/audio/**").permitAll()
                    .antMatchers("/img/**").permitAll()
                    .antMatchers("/fonts/**").permitAll()
                    .antMatchers("/auth/**").permitAll()
                    .antMatchers("/test").permitAll()
                    .antMatchers("/collection/card/**").permitAll()
                    .antMatchers("/collection/decks/register").permitAll()
                    //                .antMatchers("/websocket").authenticated()
                    .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .loginPage("/").permitAll()
                    .defaultSuccessUrl("/auth/login")
                    .failureUrl("/auth/denied")
                .and()
                    .logout()
                    .logoutUrl("/auth/logout")
                    .logoutSuccessUrl("/")
                ;
//        .and()
//                    .addFilterBefore(new OpenEntityManagerInViewFilter(), FilterChainProxy.class);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() throws Exception {
        return new BCryptPasswordEncoder();
    }
}
