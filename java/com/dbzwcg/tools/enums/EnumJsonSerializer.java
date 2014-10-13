/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.tools.enums;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author csiqueira
 */
public class EnumJsonSerializer extends JsonSerializer<Enum> {

    @Override
    public void serialize(Enum t, JsonGenerator jg, SerializerProvider sp) throws IOException, JsonProcessingException {
        try {
            Method m = t.getClass().getMethod("getValue");
            Object n = m.invoke(t);
            
            if(n instanceof Integer) {
                jg.writeNumber((Integer) n);
            } else if (n instanceof String) {
                jg.writeString((String) n);
            }
            
        } catch (NoSuchMethodException ex) {
            jg.writeNumber(t.ordinal());
        } catch (SecurityException ex) {
            Logger.getLogger(EnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(EnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(EnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvocationTargetException ex) {
            Logger.getLogger(EnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}