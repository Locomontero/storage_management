package com.e_storage.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY = "your-secret-key";

    public static String generateToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000))
                .sign(algorithm);
    }

    public static boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC256(SECRET_KEY))
                    .build()
                    .verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static String extractUsername(String token) {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(SECRET_KEY))
                .build()
                .verify(token);
        return decodedJWT.getSubject();
    }
}
