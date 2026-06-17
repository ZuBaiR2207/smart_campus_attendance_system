package com.zubiar.campusfest.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.zubiar.campusfest.dto.AttendanceStatsResponse;
import com.zubiar.campusfest.dto.RegistrationRequest;
import com.zubiar.campusfest.dto.RegistrationResponse;
import com.zubiar.campusfest.model.Attendance;
import com.zubiar.campusfest.repositories.AttendeeRepository;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final AttendanceWebSocketHandler webSocketHandler;

    private static final DateTimeFormatter DISPLAY_FMT = DateTimeFormatter.ofPattern("hh:mm a");

    @Transactional
    public RegistrationResponse register(RegistrationRequest req) {
        String email = req.getEmail().trim().toLowerCase();

        if (attendeeRepository.existsByEmail(email))
            throw new IllegalStateException("This email is already registered.");

        Attendance attendee = Attendance.builder()
                .name(req.getName().trim())
                .email(email)
                .department(StringUtils.hasText(req.getDepartment()) ? req.getDepartment().trim() : null)
                .build();

        Attendance saved = attendeeRepository.save(attendee);
        log.info("New registration: {} (id={})", saved.getName(), saved.getId());

        // Push live update to dashboard
        webSocketHandler.broadcastStatsUpdate(buildStats());

        return RegistrationResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .department(saved.getDepartment())
                .registeredAt(saved.getRegisteredAt())
                .message("You're registered! Welcome to ALFA IT Festival 🎉")
                .build();
    }

    @Transactional(readOnly = true)
    public AttendanceStatsResponse getStats() {
        return buildStats();
    }

    private AttendanceStatsResponse buildStats() {
        long total = attendeeRepository.count();

        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);
        List<AttendanceStatsResponse.HourlyCount> hourly = attendeeRepository.findHourlyCountsSince(startOfDay).stream()
                .map(r -> AttendanceStatsResponse.HourlyCount.builder()
                        .hour(String.format("%02d:00", r[0]))
                        .count(((Number) r[1]).longValue())
                        .build())
                .toList();

        Map<String, Long> deptMap = new LinkedHashMap<>();
        attendeeRepository.findDepartmentBreakdown()
                .forEach(r -> deptMap.put(
                        r[0] != null ? (String) r[0] : "Unknown",
                        ((Number) r[1]).longValue()));

        List<AttendanceStatsResponse.RecentAttendee> recent = attendeeRepository.findTop10ByOrderByRegisteredAtDesc()
                .stream()
                .map(a -> AttendanceStatsResponse.RecentAttendee.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .email(a.getEmail())
                        .department(a.getDepartment())
                        .registeredAt(a.getRegisteredAt().format(DISPLAY_FMT))
                        .build())
                .toList();

        return AttendanceStatsResponse.builder()
                .totalAttendees(total)
                .hourlyBreakdown(hourly)
                .departmentBreakdown(deptMap)
                .recentAttendees(recent)
                .build();
    }
}