/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.players;

import com.dbzwcg.services.sql.ConnectionFactory;
import com.dbzwcg.model.users.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */

@Entity
@Table
@PrimaryKeyJoinColumn
@Inheritance(strategy = InheritanceType.JOINED)
public class Player extends User {

    @Column(name = "POINTS")
    protected Integer points;

    @Column(name = "DISPLAYNAME")
    protected String displayName;

    public Integer getPoints() {
        return this.points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
    
    public String getDisplayName() {
        return this.displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String getPassword() {
        return "SECURED";
    }
    
    @Override
    public String getEmail() {
        return "SECURED";
    }

    public Object getPlayer() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}