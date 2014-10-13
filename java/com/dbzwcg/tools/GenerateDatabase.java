/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.tools;

import com.dbzwcg.model.cards.sourcecards.SourceCardDLO;
import com.dbzwcg.model.cards.sourcecards.personalities.PersonalityCardDLO;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.model.players.ai.AIPlayer;
import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.model.users.authority.Authority;
import com.dbzwcg.model.users.authority.AuthorityDLO;
import com.dbzwcg.model.users.authority.AuthorityType;
import com.dbzwcg.model.users.user.UserDLO;
import java.util.Arrays;
import java.util.TreeSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author csiqueira
 */
@Transactional
@Service
public class GenerateDatabase {

    @Autowired
    private SourceCardDLO sourceCardDLO;
    
    public void generate() {
        AuthorityType[] authorities = AuthorityType.values();

        for (AuthorityType type : authorities) {
            if (AuthorityDLO.getAuthorityByType(type) == null) {
                Authority a = new Authority();
                a.setAuthorityType(type);
                AuthorityDLO.persistAuthority(a);
            }
        }

        if (UserDLO.getUserFromUsername("ai@dbzwcg.com") == null) {
            AIPlayer aiPlayer = new AIPlayer();
            aiPlayer.setDisplayName("AI");
            aiPlayer.setEnable(false);
            aiPlayer.setEmail("ai@dbzwcg.com");
            aiPlayer.setPassword("ai@dbzwcg.com");
            aiPlayer.setPoints(0);
            aiPlayer.setRoles(new TreeSet<>());
            aiPlayer.getRoles().add(AuthorityDLO.getAuthorityByType(AuthorityType.ROLE_SYSTEM));
            UserDLO.persistUserToDatabase(aiPlayer);
        }

        if (UserDLO.getUserFromUsername("root@dbzwcg.com") == null) {
            Player root = new Player();
            root.setDisplayName("Administrator");
            root.setEnable(true);
            String encoded = UserDLO.encodePassword("root");
            root.setPassword(encoded);
            root.setPoints(0);
            root.setEmail("root@dbzwcg.com");
            root.setRoles(new TreeSet<>());
            root.getRoles().add(AuthorityDLO.getAuthorityByType(AuthorityType.ROLE_ADMIN));
            UserDLO.persistUserToDatabase(root);
        }

        sourceCardDLO.readJSFiles();

        // Convert VEGETA level 1
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "173",
                Arrays.asList("0", "2000", "2200", "2400", "2600", "2800", "3000", "3200", "3400", "3600", "3800"),
                AlignmentType.ROGUE,
                "2",
                1);

        // Convert VEGETA level 2
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "174",
                Arrays.asList("0", "4200", "4700", "5200", "5700", "6200", "6700", "7200", "7700", "8200", "8700"),
                AlignmentType.ROGUE,
                "4",
                2);

        // Convert VEGETA level 3
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "175",
                Arrays.asList("0", "9000", "10000", "11000", "12000", "13000", "14000", "15000", "16000", "17000", "18000"),
                AlignmentType.ROGUE,
                "4",
                3);

        // Convert GOKU level 1
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "158",
                Arrays.asList("0", "500", "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400"),
                AlignmentType.HERO,
                "1",
                1);

        // Convert GOKU level 2
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "159",
                Arrays.asList("0", "3200", "3700", "4200", "4700", "5200", "5700", "6200", "6700", "7200", "7700"),
                AlignmentType.HERO,
                "2",
                2);

        // Convert GOKU level 3
        PersonalityCardDLO.convertSourceCardToPersonalityCard(CollectionType.COLLECTIBLE_CARD_GAME, "160",
                Arrays.asList("0", "8000", "8500", "9000", "9500", "10000", "10500", "11000", "11500", "12000", "12500"),
                AlignmentType.HERO,
                "3",
                3);
    }
}
