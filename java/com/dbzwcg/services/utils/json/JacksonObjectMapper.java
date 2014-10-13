/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.utils.json;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JacksonObjectMapper extends ObjectMapper {

    private static final Logger log = LoggerFactory.getLogger(JacksonObjectMapper.class);

    public JacksonObjectMapper() {
        configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
    }
}
