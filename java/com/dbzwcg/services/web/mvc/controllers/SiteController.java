package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.services.authentication.CustomAuthService;
import com.dbzwcg.services.configuration.WebMvcConfig;
import com.dbzwcg.services.html.HTMLHandling;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author csiqueira
 */
@Controller(value = "/")
public class SiteController {

    @RequestMapping("/")
    public String index(ModelMap map) {
        map.addAttribute("content", "/login.jsp");
        return WebMvcConfig.DEFAULT_DISPATCHER_JSP;
    }

    @RequestMapping("/test")
    public String test(ModelMap map) {
        return "/WEB-INF/jsp/test.jsp";
    }

    @RequestMapping("/demo/game")
    public String demoGame(ModelMap map) {
        return "/WEB-INF/jsp/game.jsp";
    }
    
    @RequestMapping("/news")
    public String getNews(@RequestParam(required = false) final Boolean contentOnly, ModelMap map) {
        String ret = "/WEB-INF/content/site/news.jsp";

        if(contentOnly == null || contentOnly == false) {
            ret = WebMvcConfig.DEFAULT_DISPATCHER_JSP;
            map.addAttribute("content", "/site/news.jsp");
        }
        
        map.addAttribute("news", HTMLHandling.getNews());
        return ret;
    }
}