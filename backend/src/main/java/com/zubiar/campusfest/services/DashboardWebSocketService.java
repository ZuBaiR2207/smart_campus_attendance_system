package com.zubiar.campusfest.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.zubiar.campusfest.repositories.RegistrationRepo;
import com.zubiar.campusfest.dto.DashboardUpdate;
import com.zubiar.campusfest.repositories.AttendanceRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardWebSocketService {
    private final SimpMessagingTemplate template;
    private final RegistrationRepo regRepo;
    private final AttendanceRepo attendanceRepo;

    public void sendUpdate() {

        DashboardUpdate update = new DashboardUpdate(
                regRepo.count(),
                attendanceRepo.count());

        template.convertAndSend(
                "/topic/dashboard", update);
    }
}
