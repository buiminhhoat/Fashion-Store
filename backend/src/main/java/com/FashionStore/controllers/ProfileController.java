package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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

    @PostMapping("/public/edit-profile")
    public ResponseEntity<?> editProfile(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = request.getParameter("email");

        if (!Objects.equals(email, jwtTokenUtil.getEmailFromToken(accessToken))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String fullName = request.getParameter("fullName");
        String gender = request.getParameter("gender");
        Map<String, Object> jsonData = new HashMap<>();
        String day = "", month = "", year = "";
        // Sử dụng ObjectMapper để chuyển đổi chuỗi JSON thành Map
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.readValue(request.getParameter("dateBirthday"), new TypeReference<Map<String, Object>>() {});
            day = (String) jsonData.get("day");
            month = (String) jsonData.get("month");
            year = (String) jsonData.get("year");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }


        Users findByEmail = usersRepository.findUsersByEmail(email);
        Users user = findByEmail;
        user.setFullName(fullName);
        user.setGender(gender);
        user.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));
        usersRepository.save(user);
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/admin/edit-profile")
    public ResponseEntity<?> editProfileByID(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = request.getParameter("email");
        Long userID = Long.valueOf(request.getParameter("userID"));

        if (!Objects.equals(email, jwtTokenUtil.getEmailFromToken(accessToken))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String fullName = request.getParameter("fullName");
        String gender = request.getParameter("gender");
        Map<String, Object> jsonData = new HashMap<>();
        String day = "", month = "", year = "";
        // Sử dụng ObjectMapper để chuyển đổi chuỗi JSON thành Map
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.readValue(request.getParameter("dateBirthday"), new TypeReference<Map<String, Object>>() {});
            day = (String) jsonData.get("day");
            month = (String) jsonData.get("month");
            year = (String) jsonData.get("year");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Users usersByUserID = usersRepository.findUsersByUserID(userID);
        usersByUserID.setFullName(fullName);
        usersByUserID.setGender(gender);
        usersByUserID.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));
        usersRepository.save(usersByUserID);
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/public/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");

        Users user = usersRepository.findUsersByEmail(email);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(oldPassword, user.getHashedPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu cũ không chính xác");
        }

        user.setHashedPassword(passwordEncoder.encode(newPassword));
        usersRepository.save(user);
        return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công!");
    }

    @PostMapping("/admin/change-password")
    public ResponseEntity<?> changePasswordByID(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");

        Long userID = Long.valueOf(request.getParameter("userID"));

        Users usersByUserID = usersRepository.findUsersByUserID(userID);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(oldPassword, usersByUserID.getHashedPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu cũ không chính xác");
        }

        usersByUserID.setHashedPassword(passwordEncoder.encode(newPassword));
        usersRepository.save(usersByUserID);
        return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công!");
    }
}