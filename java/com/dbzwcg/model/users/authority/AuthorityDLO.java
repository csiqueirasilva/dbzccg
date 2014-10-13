/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.users.authority;

/**
 *
 * @author csiqueira
 */
public class AuthorityDLO {

    public static Authority getAuthorityByType(AuthorityType authority) {
        return new AuthorityDAO().getAuthority(authority);
    }

    public static void persistAuthority(Authority authority) {
        new AuthorityDAO().persistAuthority(authority);
    }
}
