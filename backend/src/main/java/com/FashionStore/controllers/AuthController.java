package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

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

        String plainPassword = request.getParameter("password");

        Users findByEmail = usersRepository.findUsersByEmail(email);
        Users findByPhoneNumber = usersRepository.findUsersByEmail(phoneNumber);

        if (findByEmail == null && findByPhoneNumber == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
        }

        Users user = (findByEmail != null) ? findByEmail : findByPhoneNumber;

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(plainPassword, user.getHashedPassword())) {
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
            String plainPassword = request.getParameter("hashedPassword");

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(plainPassword);

            Users findByEmail = usersRepository.findUsersByEmail(email);
            List<Users> findByPhoneNumber = usersRepository.findUsersByPhoneNumber(phoneNumber);

            if (findByEmail == null) {
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

    @GetMapping("/login-with-google")
    public ResponseEntity<?> loginWithGoogle(HttpServletRequest request) {
        String idToken = request.getHeader("Authorization");
        idToken = idToken.replace("Bearer ", "");
        String uri = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Thực hiện yêu cầu và nhận ResponseEntity
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

            // Kiểm tra trạng thái HTTP
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String resultJson = restTemplate.getForObject(uri, String.class);

                // Sử dụng ObjectMapper để chuyển đổi JSON thành JsonNode
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode resultNode;
                try {
                    resultNode = objectMapper.readTree(resultJson);
                } catch (Exception e) {
                    return ResponseEntity.status(500).body("Error processing JSON");
                }

                // Bạn có thể truy cập dữ liệu từ JsonNode và làm gì đó với nó
                String email = resultNode.path("email").asText();
                String name = resultNode.path("name").asText();

                Users findByEmail = usersRepository.findUsersByEmail(email);
                if (findByEmail == null) {
                    Users users = new Users(name, email, jwtTokenUtil.generateAccessToken(email), "", false);
                    usersRepository.save(users);
                }

                String accessToken = jwtTokenUtil.generateAccessToken(email);
                String refreshToken = jwtTokenUtil.generateRefreshToken(email);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
//                return ResponseEntity.ok("hello");
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(), "Đăng nhập thành công", tokens));
            } else {
                // Trạng thái không phải 200 OK
                return ResponseEntity.status(responseEntity.getStatusCode()).body("Error: " + responseEntity.getStatusCodeValue());
            }
        } catch (HttpStatusCodeException e) {
            // Xử lý exception nếu có lỗi HTTP
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getStatusCode().value());
        } catch (Exception e) {
            // Xử lý các exception khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }
}