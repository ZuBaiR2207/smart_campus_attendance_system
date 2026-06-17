package com.zubiar.campusfest.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zubiar.campusfest.dto.AttendanceStatsResponse;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@RequiredArgsConstructor
@Slf4j
public class AttendanceWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        log.info("Dashboard connected: {}", session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        log.info("Dashboard disconnected: {}", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if ("ping".equals(message.getPayload()))
            session.sendMessage(new TextMessage("pong"));
    }

    public void broadcastStatsUpdate(AttendanceStatsResponse stats) {
        if (sessions.isEmpty())
            return;
        try {
            TextMessage msg = new TextMessage(objectMapper.writeValueAsString(stats));
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    try {
                        s.sendMessage(msg);
                    } catch (IOException e) {
                        sessions.remove(s);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Broadcast failed", e);
        }
    }
}
