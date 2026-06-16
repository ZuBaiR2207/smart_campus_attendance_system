package com.zubiar.campusfest.services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.zubiar.campusfest.model.Attendance;
import com.zubiar.campusfest.model.Users;
import com.zubiar.campusfest.repositories.AttendanceRepo;
import com.zubiar.campusfest.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepo attendanceRepo;
    private final UserRepo userRepo;
    private final DashboardWebSocketService wsService;

    public String checkIn(Long userId) {

        if (attendanceRepo.existsByUserId(userId)) {
            return "Already checked in";
        }

        Users user = userRepo.findById(userId).orElseThrow();

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setCheckInTime(LocalDateTime.now());

        attendanceRepo.save(attendance);

        wsService.sendUpdate();
        return "Check-in successful";
    }
}