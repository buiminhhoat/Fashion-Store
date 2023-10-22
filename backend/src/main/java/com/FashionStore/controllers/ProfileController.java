package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping("/edit-profile")
    public ResponseEntity<?> editProfile(@RequestBody Map<String, String> credentials, @RequestHeader("Authorization") String refreshToken) {
        refreshToken = refreshToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = credentials.get("email");

        if (!Objects.equals(email, jwtTokenUtil.getEmailFromToken(refreshToken))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String fullName = credentials.get("fullName");
        String gender = credentials.get("gender");
        Map<String, Object> jsonData = new HashMap<>();
        String day = "", month = "", year = "";
        // Sử dụng ObjectMapper để chuyển đổi chuỗi JSON thành Map
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.readValue(credentials.get("dateBirthday"), new TypeReference<Map<String, Object>>() {});
            day = (String) jsonData.get("day");
            month = (String) jsonData.get("month");
            year = (String) jsonData.get("year");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }


        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        Users user = findByEmail.get(0);
        user.setFullName(fullName);
        user.setGender(gender);
        user.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));
        usersRepository.save(user);
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> credentials,
                                            @RequestHeader("Authorization") String refreshToken) {
        refreshToken = refreshToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(refreshToken);
        String oldPassword = credentials.get("oldPassword");
        String newPassword = credentials.get("newPassword");

        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        Users user = findByEmail.get(0);
        if (!Objects.equals(user.getHashedPassword(), oldPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu cũ không chính xác");
        }
        user.setHashedPassword(newPassword);
        usersRepository.save(user);
        return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công!");
    }
}