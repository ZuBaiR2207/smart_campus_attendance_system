package com.zubiar.campusfest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import com.zubiar.campusfest.model.Users;

public interface UserRepo extends JpaRepository<Users, Long> {}

