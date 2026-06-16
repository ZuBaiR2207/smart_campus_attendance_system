package com.zubiar.campusfest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zubiar.campusfest.services.AttendanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/checkin")
    public ResponseEntity<?> checkIn(@RequestParam Long userid) {

        return ResponseEntity.ok(attendanceService.checkIn(userid));
    }

}
