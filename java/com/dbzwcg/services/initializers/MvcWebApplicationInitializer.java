package com.dbzwcg.services.initializers;

import com.dbzwcg.services.configuration.JPAConfig;
import com.dbzwcg.services.configuration.SecurityConfig;
import com.dbzwcg.services.configuration.WebMvcConfig;
import com.dbzwcg.services.configuration.WebSocketConfig;
import javax.servlet.Filter;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;


public class MvcWebApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{JPAConfig.class, SecurityConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebMvcConfig.class, WebSocketConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected Filter[] getServletFilters() {
        OpenEntityManagerInViewFilter oem = new OpenEntityManagerInViewFilter();
        return new Filter[]{oem};
    }
}