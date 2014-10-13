/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.utils.json;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/* src: http://thinkinginsoftware.blogspot.com.br/2013/02/custom-jsp-taglib-to-convert-object-to.html */

public final class JsonUtils {

    private JsonUtils() {
    }

    public static String toJson(Object value) throws JsonGenerationException, JsonMappingException, IOException {
        JacksonObjectMapper mapper = new JacksonObjectMapper();
        return mapper.writeValueAsString(value);
    }
}
