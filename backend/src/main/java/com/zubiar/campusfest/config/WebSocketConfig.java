package com.zubiar.campusfest.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

import com.zubiar.campusfest.services.AttendanceWebSocketHandler;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final AttendanceWebSocketHandler attendanceWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(attendanceWebSocketHandler, "/ws/attendance")
                .setAllowedOriginPatterns("*");
    }
}