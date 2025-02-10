package com.e_storage.controller;

import com.e_storage.model.UserCredentials;
import com.e_storage.model.User;
import com.e_storage.security.JwtUtil;
import com.e_storage.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5175")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody UserCredentials credentials) {
        User user = authService.authenticate(credentials.getUsername(), credentials.getPassword());

        if (user != null) {

            String token = JwtUtil.generateToken(user.getUsername());

            return token;
        } else {

            throw new RuntimeException("Invalid username or password");
        }
    }
}
