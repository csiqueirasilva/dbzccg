package com.dbzwcg.services.web.mvc.controllers;

import com.dbzwcg.model.cards.instancedcards.InstancedCard;
import com.dbzwcg.model.exceptions.ShopException;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.services.authentication.CustomAuthService;
import com.dbzwcg.services.configuration.WebMvcConfig;
import com.dbzwcg.services.shop.ShopService;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.types.sagas.CollectibleCardGameSagaType;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author csiqueira
 */
@Controller
@RequestMapping("shop/")
public class ShopController {
    
    @Autowired
    private ShopService shopService;
    
    @RequestMapping("boosters")
    public String boosters(ModelMap map) {
        map.addAttribute("content", "/shop/boosters.jsp");

        List<String> ccgSagas = EnumTools.getFormattedEnumList(CollectibleCardGameSagaType.class);
        
        map.addAttribute("boosterPrice", ShopService.pointPackPrice);
        map.addAttribute("collectibleCardGameId", CollectibleCardGameSagaType.dbPrefix);
        map.addAttribute("collectibleCardGame", ccgSagas);
        
        return WebMvcConfig.DEFAULT_DISPATCHER_JSP;
    }
    
    @Transactional
    @RequestMapping(value = "boosters/buy", method = RequestMethod.POST)
    public @ResponseBody List<InstancedCard> buy(@RequestParam("collection") String collection, @RequestParam("saga") String saga, @RequestParam("qtt") Integer qtt, ModelMap map) {
        List<InstancedCard> purchased = null;
        
        String revertedSaga = EnumTools.revertMappedCharsJsonIdentifier(saga);
        Enum enumSaga = EnumTools.getEnumTypeFromPackage(revertedSaga, "com.dbzwcg.types.sagas");
        
        if(enumSaga != null) {
            Player p = (Player) CustomAuthService.getUserFromSecurityContext();
            
            try {
                purchased = shopService.buyPack(enumSaga, p, qtt);
                CustomAuthService.reloadUserDetails();
            } catch (ShopException ex) {
                Logger.getLogger(ShopController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        return purchased;
    }
}