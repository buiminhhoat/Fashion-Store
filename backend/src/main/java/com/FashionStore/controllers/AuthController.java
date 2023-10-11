package com.FashionStore.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Đặt mã xử lý đăng nhập ở đây
        // Kiểm tra email và mật khẩu, thực hiện xác thực

        // Ví dụ đơn giản: kiểm tra mật khẩu là "password"

        if ("05082003".equals(password)) {
            // Xác thực thành công
            return ResponseEntity.status(HttpStatus.OK).body("Đăng nhập thành công");
        } else {
            // Xác thực thất bại
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công");
        }
    }
}