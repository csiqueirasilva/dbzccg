package com.dbzwcg;

import com.dbzwcg.services.chat.ChatMessage;
import com.dbzwcg.types.ChatType;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.types.AlignmentType;
import com.dbzwcg.types.PersonalityType;
import com.dbzwcg.types.RarityType;
import com.google.gson.Gson;

public class App {
    public static void main(String[] args) {
//        UserDLO.getAuthUserDetails("root@dbzwcg.com");
//        ChatMessage cm = new ChatMessage("Super!");
//        System.out.println(cm.getTime());
        
        System.out.println(EnumTools.getAsJavascriptLine(ChatType.class));
        System.out.println(EnumTools.getAsJavascriptLine(AlignmentType.class));
        System.out.println(EnumTools.getAsJavascriptLine(PersonalityType.class));
        System.out.println(EnumTools.getAsJavascriptLine(RarityType.class));
        System.out.println(new Gson().toJson(PersonalityType.femaleList));
    }
}