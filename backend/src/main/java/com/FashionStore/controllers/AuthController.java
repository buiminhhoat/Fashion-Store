package com.FashionStore.controllers;

import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UsersRepository usersRepository;

    @Autowired
    public AuthController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Đặt mã xử lý đăng nhập ở đây
        // Kiểm tra email và mật khẩu, thực hiện xác thực


        if ("05082003".equals(password)) {
            // Xác thực thành công
            return ResponseEntity.status(HttpStatus.OK).body("Đăng nhập thành công");
        } else {
            // Xác thực thất bại
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users users) {
        try {
            usersRepository.save(users);
            return ResponseEntity.ok("Đăng ký thành công");
        }
        catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng ký không thành công");
        }
    }
}