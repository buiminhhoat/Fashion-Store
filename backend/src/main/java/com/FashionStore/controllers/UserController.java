package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @GetMapping("/get-user-data")
    public ResponseEntity<Users> getUserData(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            if (!Objects.equals(email, jwtTokenUtil.getEmailFromToken(accessToken))) {
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

    @GetMapping("/get-all-users")
    public ResponseEntity<?> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        for (Users user: users) {
            user.setHashedPassword(null);
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/edit-user")
    public ResponseEntity<?> editUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter("userID"));
        String email = request.getParameter("email");
        String fullName = request.getParameter("fullName");
        String gender = request.getParameter("gender");
        String newPassword = request.getParameter("newPassword");
        String phoneNumber = request.getParameter("phoneNumber");
        boolean isAdmin = Boolean.parseBoolean(request.getParameter("isAdmin"));

        Users user = usersRepository.findUsersByUserID(userID);

        user.setEmail(email);
        user.setFullName(fullName);
        user.setGender(gender);
        user.setHashedPassword(newPassword);
        user.setPhoneNumber(phoneNumber);
        user.setIsAdmin(isAdmin);

        Map<String, Object> jsonData = new HashMap<>();
        String day = "", month = "", year = "";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.readValue(request.getParameter("dateBirthday"),
                    new TypeReference<Map<String, Object>>() {});
            day = (String) jsonData.get("day");
            month = (String) jsonData.get("month");
            year = (String) jsonData.get("year");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        user.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));

        usersRepository.save(user);
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/delete-user")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter("userID"));

        Users user = usersRepository.findUsersByUserID(userID);

        usersRepository.delete(user);

        ResponseObject responseObject = new ResponseObject("Thông tin người dùng đã được xóa");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/search-user-by-email")
    public ResponseEntity<?> searchUserByEmail(HttpServletRequest request) {
        String email = request.getParameter("email");

        List<Users> users = usersRepository.findUsersByEmail(email);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search-user-by-phone-number")
    public ResponseEntity<?> searchUserByPhoneNumber(HttpServletRequest request) {
        String phoneNumber = request.getParameter("phoneNumber");

        List<Users> users = usersRepository.findUsersByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(users);
    }
}