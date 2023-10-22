package com.FashionStore.controllers;

import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final UsersRepository usersRepository;

    @Autowired
    public UserController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/user-data")
    public ResponseEntity<Users> getUserData(@RequestHeader("Authorization") String refreshToken) {
        refreshToken = refreshToken.replace("Bearer ", "");
        if (jwtTokenUtil.isTokenValid(refreshToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(refreshToken);
            if (!Objects.equals(email, jwtTokenUtil.getEmailFromToken(refreshToken))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            List<Users> findByEmail = usersRepository.findUsersByEmail(email);
            Users users = findByEmail.get(0);
            users.setHashedPassword(null);
            return ResponseEntity.ok(users);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}