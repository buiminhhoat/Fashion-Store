package com.FashionStore.controllers;

import com.FashionStore.models.JwtResponse;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UsersRepository usersRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> login(HttpServletRequest request) {
        String email = request.getParameter("email");
        String phoneNumber = request.getParameter("email");
        String password = request.getParameter("password");

        List<Users> findByEmail = usersRepository.findUsersByEmailAndHashedPassword(email, password);
        List<Users> findByPhoneNumber = usersRepository.findUsersByPhoneNumberAndHashedPassword(phoneNumber, password);

        if (findByEmail.isEmpty() && findByPhoneNumber.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
        }

        String accessToken = jwtTokenUtil.generateAccessToken(email);
        String refreshToken = jwtTokenUtil.generateRefreshToken(email);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(), "Đăng nhập thành công", tokens));
    }

    @PostMapping("/public/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String refreshToken = request.getHeader("Authorization");
        refreshToken = refreshToken.replace("Bearer ", "");

        if (jwtTokenUtil.isTokenExpired(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtTokenUtil.getSubjectFromToken(refreshToken);
        String newAccessToken = jwtTokenUtil.generateAccessToken(username);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", newAccessToken);

        return ResponseEntity.ok(tokens);
    }

    @PostMapping("/public/register")
    public ResponseEntity<String> registerUser(HttpServletRequest request) {
        try {
            String fullName = request.getParameter("fullName");
            String email = request.getParameter("email");
            String phoneNumber = request.getParameter("phoneNumber");
            String hashedPassword = request.getParameter("hashedPassword");

            List<Users> findByEmail = usersRepository.findUsersByEmail(email);
            List<Users> findByPhoneNumber = usersRepository.findUsersByPhoneNumber(phoneNumber);

            if (!findByEmail.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email đã tồn tại trên hệ thống. Đăng ký không thành công! ");
            }

            if (!findByPhoneNumber.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Số điện thoại đã tồn tại trên hệ thống. Đăng ký không thành công!");
            }

            Users users = new Users(fullName, email, hashedPassword, phoneNumber, false);
            usersRepository.save(users);
            return ResponseEntity.ok("Đăng ký thành công");
        }
        catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng ký không thành công");
        }
    }
}