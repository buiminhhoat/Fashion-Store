package com.FashionStore.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access_token_validity_seconds}")
    private long accessTokenValiditySeconds;

    public String generateAccessToken(String subject) {
        return generateToken(subject, accessTokenValiditySeconds);
    }

    public String generateToken(String subject, long validityInSeconds) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInSeconds * 1000);

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", subject);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String getSubjectFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            Date expiration = claims.getExpiration();
            Date now = new Date();

            // Kiểm tra nếu thời gian hết hạn của token đã qua thời gian hiện tại
            return expiration.before(now);
        } catch (Exception e) {
            // Xảy ra lỗi khi giải mã token (không phải là hết hạn)
            return true;
        }
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            Date now = new Date();
            Date expiration = claims.getExpiration();

            // Kiểm tra thời gian hết hạn của token
            if (expiration != null && !expiration.before(now)) {
                return true;
            }
        } catch (Exception e) {
            // Xảy ra lỗi khi giải mã token (token không hợp lệ)
        }

        return false;
    }

    public String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            // Lấy giá trị của trường "email" từ JWT
            return claims.get("email", String.class);
        } catch (Exception e) {
            // Xảy ra lỗi khi giải mã token (token không hợp lệ)
            return null;
        }
    }
}
