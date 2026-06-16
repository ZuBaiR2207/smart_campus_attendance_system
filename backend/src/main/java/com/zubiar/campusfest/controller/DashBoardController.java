package com.zubiar.campusfest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zubiar.campusfest.repositories.AttendanceRepo;
import com.zubiar.campusfest.repositories.RegistrationRepo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashBoardController {

    private final RegistrationRepo regRepo;
    private final AttendanceRepo attendanceRepo;

    @GetMapping("/dashboard")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalRegistrations", regRepo.count());
        stats.put("totalCheckins", attendanceRepo.count());

        return stats;
    }

}
