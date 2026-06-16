package com.zubiar.campusfest.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zubiar.campusfest.model.Registration;

public interface RegistrationRepo extends JpaRepository<Registration, Long> {
	Optional<Registration> findByUserIdAndEventId(long userId, long eventId);

}
