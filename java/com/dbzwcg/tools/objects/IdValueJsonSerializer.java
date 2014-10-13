/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.tools.objects;

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
public class IdValueJsonSerializer extends JsonSerializer<Object> {

    @Override
    public void serialize(Object t, JsonGenerator jg, SerializerProvider sp) throws IOException, JsonProcessingException {
        if(t != null) {
            try {
                Method m = t.getClass().getMethod("getId");
                int id = (Integer) m.invoke(t);
                jg.writeNumber(id);
            } catch (NoSuchMethodException ex) {
                jg.writeNull();
            } catch (IllegalAccessException ex) {
                Logger.getLogger(IdValueJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalArgumentException ex) {
                Logger.getLogger(IdValueJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
            } catch (InvocationTargetException ex) {
                Logger.getLogger(IdValueJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SecurityException ex) {
                Logger.getLogger(IdValueJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            jg.writeNull();
        }
    }
}