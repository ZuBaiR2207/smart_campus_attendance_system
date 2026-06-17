package com.zubiar.campusfest.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zubiar.campusfest.dto.AttendanceStatsResponse;
import com.zubiar.campusfest.dto.RegistrationRequest;
import com.zubiar.campusfest.dto.RegistrationResponse;
import com.zubiar.campusfest.services.AttendeeService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AttendeeController {

    private final AttendeeService attendeeService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(
            @Valid @RequestBody RegistrationRequest req) {
        return ResponseEntity.ok(attendeeService.register(req));
    }

    @GetMapping("/stats")
    public ResponseEntity<AttendanceStatsResponse> getStats() {
        return ResponseEntity.ok(attendeeService.getStats());
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Smart Campus backend is running ✅");
    }
}
