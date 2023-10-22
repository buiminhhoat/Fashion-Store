package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProfileController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final UsersRepository usersRepository;

    @Autowired
    public ProfileController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/edit-profile")
    public ResponseEntity<?> editProfile(@RequestBody Map<String, String> credentials, @RequestHeader("Authorization") String refreshToken) {
        // Lấy thông tin người dùng từ `updateUserInfoRequest`
        refreshToken = refreshToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = credentials.get("email");
        String fullName = credentials.get("fullName");
        String gender = credentials.get("gender");

        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        Users user = findByEmail.get(0);
        user.setFullName(fullName);
        usersRepository.save(user);
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }
}