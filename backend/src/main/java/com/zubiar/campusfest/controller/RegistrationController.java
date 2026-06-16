package com.zubiar.campusfest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zubiar.campusfest.component.QRCodeComponent;
import com.zubiar.campusfest.services.RegistrationService;
import com.zubiar.campusfest.model.Registration;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService service;
    private final QRCodeComponent qrCodeUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam Long userId,
            @RequestParam Long eventId) {

        Registration reg = service.register(userId, eventId);

        return ResponseEntity.ok(reg);
    }

    @GetMapping("/qr/{userId}")
    public ResponseEntity<byte[]> getQR(@PathVariable Long userId) throws Exception {

        byte[] qr = qrCodeUtil.generateQRCode(String.valueOf(userId));

        return ResponseEntity.ok()
                .header("Content-Type", "image/png")
                .body(qr);
    }
}
