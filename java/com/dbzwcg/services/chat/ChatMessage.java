package com.dbzwcg.services.chat;

import com.dbzwcg.types.ChatType;
import com.dbzwcg.model.users.user.User;
import org.joda.time.DateTime;

public class ChatMessage {

    private User destinationUser;
    private User sourceUser;
    private String message;
    private ChatType type;
    private String time;

    private void createTime () {
        DateTime dt = new DateTime();
        this.time = "[" + dt.dayOfMonth().getAsShortText() + "/"
                        + dt.monthOfYear().getAsShortText() + "/" 
                        + dt.year().getAsShortText() + " "
                        + (dt.getHourOfDay() < 10 ? "0" + dt.getHourOfDay() : dt.getHourOfDay()) + ":"
                        + (dt.getMinuteOfHour() < 10 ? "0" + dt.getMinuteOfHour() : dt.getMinuteOfHour()) + ":"
                        + (dt.getSecondOfMinute() < 10 ? "0" + dt.getSecondOfMinute() : dt.getSecondOfMinute()) + "]";
    }
    
    public ChatMessage() {
        createTime();
    }
    
    public ChatMessage(String message, User sourceUser, User destinationUser) {
        this();
        this.message = message;
        this.sourceUser = sourceUser;
        
        if(destinationUser == null) {
            this.type = ChatType.GLOBAL;
        } else if (sourceUser == null) {
            this.type = ChatType.SYSTEM;
        } else {
            this.type = ChatType.PRIVATE;
            this.destinationUser = destinationUser;
        }
    }
    
    // Maybe use JODA to create a static method to convert time into DateTime
    
    public String getMessage() {
        return this.message;
    }
    
    public ChatType getType() {
        return this.type;
    }
    
    public String getTime() {
        return this.time;
    }
    
    public User getSourceUser() {
        return this.sourceUser;
    }
    
    public User getDestinationUser() {
        return this.destinationUser;
    }
}