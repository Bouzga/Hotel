package com.example.back.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.back.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}

