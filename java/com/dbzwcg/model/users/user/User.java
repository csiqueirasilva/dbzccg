package com.dbzwcg.model.users.user;

import com.dbzwcg.model.users.authority.Authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

/**
 * @author csiqueira
 */
@Entity
@SequenceGenerator(name = User.USER_SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable {

    public static final String USER_SEQUENCE_NAME = "SEQ_USERS";
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable
    protected Set<Authority> roles;

    @Column
    protected Boolean online = false;

    @JsonIgnore
    @Column
    protected Boolean enable;

    @JsonIgnore
    @Column
    protected String email;

    @JsonIgnore
    @Column(length = 1000)
    protected String password;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = USER_SEQUENCE_NAME)
    @Column
    protected Integer id;

    @JsonIgnore
    @Column
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    protected DateTime lastOnline;

    public DateTime getLastOnline() {
        return lastOnline;
    }

    public void setLastOnline(DateTime lastOnline) {
        this.lastOnline = lastOnline;
    }

    public Set<Authority> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<Authority> roles) {
        this.roles = roles;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnable() {
        return this.enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }
}
