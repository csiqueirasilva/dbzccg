/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.users.authority;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author csiqueira
 */
@Entity
@SequenceGenerator(name = Authority.AUTHORITY_SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"authorityType"}))
public class Authority implements Serializable, GrantedAuthority, Comparable<Authority> {
    public static final String AUTHORITY_SEQUENCE_NAME = "SEQ_AUTHORITIES";

    @Enumerated(EnumType.STRING)
    @Column
    protected AuthorityType authorityType;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = AUTHORITY_SEQUENCE_NAME)
    @Column
    protected Integer id;
    
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return this.authorityType.toString();
    }
    
    public AuthorityType getAuthorityType() {
        return this.authorityType;
    }
    
    public void setAuthorityType(AuthorityType authorityType) {
        this.authorityType = authorityType;
    }

    @Override
    public int compareTo(Authority o) {
        if(this.equals(o)) {
            return 0;
        } else {
            return -1;
        }
    }
}