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
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author csiqueira
 */
public class CollectionEnumJsonSerializer extends JsonSerializer<Collection<Enum>> {

    @Override
    public void serialize(Collection<Enum> t, JsonGenerator jg, SerializerProvider sp) throws IOException, JsonProcessingException {
        jg.writeStartArray(); // [

        Enum[] e = new Enum[t.size()];
        t.toArray(e);

        try {
            if (t.size() > 0) {
                for (Enum enm : e) {
                    Method m = enm.getClass().getMethod("getValue");
                    int n = (Integer) m.invoke(enm);
                    jg.writeNumber(n);
                }
            }
        } catch (NoSuchMethodException ex) {
            for (Enum enm : e) {
                jg.writeNumber(enm.ordinal());
            }
        } catch (SecurityException ex) {
            Logger.getLogger(CollectionEnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(CollectionEnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(CollectionEnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvocationTargetException ex) {
            Logger.getLogger(CollectionEnumJsonSerializer.class.getName()).log(Level.SEVERE, null, ex);
        }

        jg.writeEndArray();
    }
}
