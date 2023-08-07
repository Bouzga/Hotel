package com.example.back.controller;

import com.example.back.entities.User;
import com.example.back.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User authRequest) {
        if (authService.authenticate(authRequest.getLogin(), authRequest.getPassword())) {
            return ResponseEntity.ok("Authentification réussie !");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Échec de l'authentification !");
        }
    }
}
