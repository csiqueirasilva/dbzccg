/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.services.configuration;

import com.dbzwcg.services.sql.ConnectionFactory;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.aspectj.EnableSpringConfigured;

/**
 *
 * @author csiqueira
 */
@Configuration
@ComponentScan(basePackages = {"com.dbzwcg.model"})
public class JPAConfig {

    @Bean(name = "entityManagerFactory", destroyMethod = "close")
    public EntityManagerFactory getEntityManagerFactory() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory(ConnectionFactory.PERSISTENCE_UNIT_NAME);
        return emf;
    }
}