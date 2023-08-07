package com.example.back.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.back.entities.User;
import com.example.back.dao.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean authenticate(String login, String password) {
        User user = userRepository.findByLogin(login);
        if (user != null && password.equals(user.getPassword())) {
            return true;
        }
        return false;
    }
}
