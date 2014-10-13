/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.exceptions;

/**
 *
 * @author csiqueira
 */
public class ShopException extends Exception {
    final public static String NO_VALID_USER = "Not a valid user";
    final public static String NO_VALID_SAGA = "Not a valid saga";
    final public static String NOT_ENOUGH_POINTS = "Not enough points to purchase";
    final public static String INVALID_PURCHASE = "Purchase is invalid";
    
    private String error;
    
    public String getErrorMessage () {
        return this.error;
    }
    
    public ShopException(String msg) {
        super(msg);
        this.error = msg;
    }
    
}
