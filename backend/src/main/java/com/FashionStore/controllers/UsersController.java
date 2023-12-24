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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UsersController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final UsersRepository usersRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("/public/get-user-data")
    public ResponseEntity<Users> getUserData(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users findByEmail = usersRepository.findUsersByEmail(email);
            if (findByEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Users users = findByEmail;
            users.setHashedPassword(null);
            return ResponseEntity.ok(users);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/admin/get-user-data")
    public ResponseEntity<Users> getUserDataByID(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");

        Long userID = Long.valueOf(request.getParameter("userID"));

        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users usersByEmail = usersRepository.findUsersByEmail(email);
            if (usersByEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Users usersByUserID = usersRepository.findUsersByUserID(userID);
            usersByUserID.setHashedPassword(null);
            return ResponseEntity.ok(usersByUserID);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/public/isAdmin")
    public ResponseEntity<?> isAdmin(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users findByEmail = usersRepository.findUsersByEmail(email);
            if (findByEmail == null || !findByEmail.getIsAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "false"));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(),"true"));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "false"));
        }
    }

    @GetMapping("/public/get-user-id")
    public ResponseEntity<?> getUserID(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");

        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users findByEmail = usersRepository.findUsersByEmail(email);

            if (findByEmail == null) {
                ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
            }
            return ResponseEntity.ok(findByEmail.getUserID());
        }
        else {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<?> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        for (Users user: users) {
            user.setHashedPassword(null);
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/admin/add-user")
    public ResponseEntity<String> addUser(HttpServletRequest request) {
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
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Email đã tồn tại trên hệ thống. Thêm người dùng không thành công! ");
            }

            if (!findByPhoneNumber.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Số điện thoại đã tồn tại trên hệ thống. Thêm người dùng không thành công!");
            }

            Users users = new Users(fullName, email, hashedPassword, phoneNumber, false);
            usersRepository.save(users);
            return ResponseEntity.ok("Thêm người dùng thành công");
        }
        catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Thêm người dùng không thành công");
        }
    }

    @PostMapping("/admin/edit-user")
    public ResponseEntity<?> editUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter("userID"));
        String email = request.getParameter("email");
        String fullName = request.getParameter("fullName");
        String gender = request.getParameter("gender");
        String newPassword = request.getParameter("newPassword");
        String phoneNumber = request.getParameter("phoneNumber");
        boolean isAdmin = Boolean.parseBoolean(request.getParameter("isAdmin"));

        Users user = usersRepository.findUsersByUserID(userID);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        user.setEmail(email);
        user.setFullName(fullName);
        user.setGender(gender);
        user.setHashedPassword(passwordEncoder.encode(newPassword));
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

    @PostMapping("/admin/delete-user")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter("userID"));

        Users user = usersRepository.findUsersByUserID(userID);

        usersRepository.delete(user);

        ResponseObject responseObject = new ResponseObject("Thông tin người dùng đã được xóa");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/admin/search-user-by-email")
    public ResponseEntity<?> searchUserByEmail(HttpServletRequest request) {
        String email = request.getParameter("email");

        Users users = usersRepository.findUsersByEmail(email);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admin/search-user-by-phone-number")
    public ResponseEntity<?> searchUserByPhoneNumber(HttpServletRequest request) {
        String phoneNumber = request.getParameter("phoneNumber");

        List<Users> users = usersRepository.findUsersByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/public/upload-profile-image")
    public ResponseEntity<?> uploadProfileImage(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("profileImage");

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String originalFilename = image.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            }
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;

            try {
                String imagePath = appRoot + UPLOAD_DIR + File.separator + fileName;
                Path path = Paths.get(imagePath);
                image.transferTo(path.toFile());
                paths.add(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        Users users = findByEmail;
        users.setAvatarPath(paths.get(0));
        usersRepository.save(users);

        ResponseObject responseObject = new ResponseObject("Cập nhật ảnh đại diện thành công");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/admin/upload-profile-image")
    public ResponseEntity<?> uploadProfileImageByID(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("profileImage");
        Long userID = Long.valueOf(request.getParameter("userID"));

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users usersByEmail = usersRepository.findUsersByEmail(email);
        if (usersByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String originalFilename = image.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            }
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;

            try {
                String imagePath = appRoot + UPLOAD_DIR + File.separator + fileName;
                Path path = Paths.get(imagePath);
                image.transferTo(path.toFile());
                paths.add(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        Users usersByUserID = usersRepository.findUsersByUserID(userID);
        usersByUserID.setAvatarPath(paths.get(0));
        usersRepository.save(usersByUserID);

        ResponseObject responseObject = new ResponseObject("Cập nhật ảnh đại diện thành công");
        return ResponseEntity.ok(responseObject);

    }
}