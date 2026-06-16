package com.zubiar.campusfest.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.zubiar.campusfest.model.Event;
import com.zubiar.campusfest.model.Registration;
import com.zubiar.campusfest.model.Users;
import com.zubiar.campusfest.repositories.EventRepo;
import com.zubiar.campusfest.repositories.RegistrationRepo;
import com.zubiar.campusfest.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepo userRepo;
    private final EventRepo eventRepo;
    private final RegistrationRepo regRepo;

    public Registration register(Long userId, Long eventId) {

        if (regRepo.findByUserIdAndEventId(userId, eventId).isPresent()) {
            throw new RuntimeException("User Already registered");
        }

        Users user = userRepo.findById(userId).orElseThrow();
        Event event = eventRepo.findById(eventId).orElseThrow();

        Registration reg = new Registration();

        return regRepo.save(reg);
    }
}