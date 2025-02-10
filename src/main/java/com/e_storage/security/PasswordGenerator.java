package com.e_storage.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "Gorila@01";
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println(hashedPassword);
    }
}
