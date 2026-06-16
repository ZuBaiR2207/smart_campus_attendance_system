package com.zubiar.campusfest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zubiar.campusfest.model.Event;

public interface EventRepo  extends JpaRepository<Event, Long> {

}
