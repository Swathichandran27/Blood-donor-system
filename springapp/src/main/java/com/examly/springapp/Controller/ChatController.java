package com.examly.springapp.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.examly.springapp.Entity.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")  
    @SendTo("/topic/public")              
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        return chatMessage;
    }
}

