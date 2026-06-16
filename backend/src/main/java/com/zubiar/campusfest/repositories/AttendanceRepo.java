package com.zubiar.campusfest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zubiar.campusfest.model.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
	
	boolean existsByUserId(long userId);

}
