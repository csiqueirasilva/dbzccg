package com.dbzwcg.services.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
@EnableScheduling
@ComponentScan(basePackages = {"com.dbzwcg.services"})
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    public final static String DEFAULT_MISSING_PAGE = "/WEB-INF/jsp/missing.jsp";
    public final static String DEFAULT_DISPATCHER_JSP = "/WEB-INF/jsp/dispatcher.jsp";
    public final static String DEFAULT_MISSING_ERROR = "Missing %msg%: %resource%";

    public static String setContentOnly(Boolean contentOnly, String returnPath, ModelMap map) {
        String ret = returnPath;

        if (contentOnly == null || contentOnly == false) {
            ret = DEFAULT_DISPATCHER_JSP;
            map.addAttribute("content", returnPath.replace("/WEB-INF/content", ""));
        }
        return ret;
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

}
