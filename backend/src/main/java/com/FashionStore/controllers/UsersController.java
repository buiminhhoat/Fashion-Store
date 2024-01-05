package com.FashionStore.controllers;

import com.FashionStore.freeimage.FreeImageService;
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
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.sql.Date;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class UsersController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final UsersRepository usersRepository;

    @Autowired
    private FreeImageService freeImageService;

    @Value("${header.authorization}")
    private String HEADER_AUTHORIZATION;

    @Value("${authorization.bearer}")
    private String AUTHORIZATION_BEARER;

    @Value("${param.userID}")
    private String PARAM_USER_ID;

    @Value("${param.fullName}")
    private String PARAM_FULL_NAME;

    @Value("${param.email}")
    private String PARAM_EMAIL;

    @Value("${param.phoneNumber}")
    private String PARAM_PHONE_NUMBER;

    @Value("${param.hashedPassword}")
    private String PARAM_HASHED_PASSWORD;

    @Value("${param.isAdmin}")
    private String PARAM_IS_ADMIN;

    @Value("${param.newPassword}")
    private String PARAM_NEW_PASSWORD;

    @Value("${param.gender}")
    private String PARAM_GENDER;

    @Value("${param.dateBirthday}")
    private String PARAM_DATE_BIRTHDAY;

    @Value("${param.day}")
    private String PARAM_DAY;

    @Value("${param.month}")
    private String PARAM_MONTH;

    @Value("${param.year}")
    private String PARAM_YEAR;

    private final String RESPONSE_ADD_USER_DUPLICATE_EMAIL;

    private final String RESPONSE_ADD_USER_DUPLICATE_PHONE_NUMBER;

    private final String RESPONSE_ADD_USER_SUCCESS;

    private final String RESPONSE_EDIT_USER_SUCCESS;

    private final String RESPONSE_DELETE_USER_SUCCESS;

    private final String RESPONSE_UPLOAD_IMAGE_SUCCESS;

    private final String RESPONSE_INVALID_TOKEN;

    @Autowired
    public UsersController(UsersRepository usersRepository, MessageSource messageSource) {
        this.usersRepository = usersRepository;
        this.RESPONSE_ADD_USER_DUPLICATE_EMAIL = messageSource.getMessage("response.adduser.duplicate.email", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADD_USER_DUPLICATE_PHONE_NUMBER = messageSource.getMessage("response.adduser.duplicate.phone-number", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADD_USER_SUCCESS = messageSource.getMessage("response.adduser.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_EDIT_USER_SUCCESS = messageSource.getMessage("response.edit-user.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_DELETE_USER_SUCCESS = messageSource.getMessage("response.delete-user.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_UPLOAD_IMAGE_SUCCESS = messageSource.getMessage("response.upload-image.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_INVALID_TOKEN = messageSource.getMessage("response.token.invalid", null, LocaleContextHolder.getLocale());
    }

    @PostMapping("${endpoint.public.get-user-data}")
    public ResponseEntity<Users> getUserData(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");

        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));

        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users usersByEmail = usersRepository.findUsersByEmail(email);
            if (usersByEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            boolean isAdmin = usersByEmail.getIsAdmin();
            if (isAdmin || Objects.equals(usersByEmail.getUserID(), userID)) {
                Users usersByUserID = usersRepository.findUsersByUserID(userID);
                usersByUserID.setHashedPassword(null);
                return ResponseEntity.ok(usersByUserID);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("${endpoint.public.isadmin}")
    public ResponseEntity<?> isAdmin(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users findByEmail = usersRepository.findUsersByEmail(email);
            if (findByEmail == null || !findByEmail.getIsAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "false"));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(), "true"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "false"));
        }
    }

    @GetMapping("${endpoint.public.get-user-id}")
    public ResponseEntity<?> getUserID(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");

        if (jwtTokenUtil.isTokenValid(accessToken)) {
            String email = jwtTokenUtil.getSubjectFromToken(accessToken);
            Users findByEmail = usersRepository.findUsersByEmail(email);

            if (findByEmail == null) {
                ResponseObject responseObject = new ResponseObject(RESPONSE_INVALID_TOKEN);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
            }
            return ResponseEntity.ok(findByEmail.getUserID());
        } else {
            ResponseObject responseObject = new ResponseObject(RESPONSE_INVALID_TOKEN);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @GetMapping("${endpoint.admin.get-all-users}")
    public ResponseEntity<?> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        for (Users user : users) {
            user.setHashedPassword(null);
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("${endpoint.admin.add-user}")
    public ResponseEntity<String> addUser(HttpServletRequest request) {
        try {
            String fullName = request.getParameter(PARAM_FULL_NAME);
            String email = request.getParameter(PARAM_EMAIL);
            String phoneNumber = request.getParameter(PARAM_PHONE_NUMBER);
            String plainPassword = request.getParameter(PARAM_HASHED_PASSWORD);

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(plainPassword);

            Users findByEmail = usersRepository.findUsersByEmail(email);
            List<Users> findByPhoneNumber = usersRepository.findUsersByPhoneNumber(phoneNumber);

            if (findByEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(RESPONSE_ADD_USER_DUPLICATE_EMAIL);
            }

            if (!findByPhoneNumber.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(RESPONSE_ADD_USER_DUPLICATE_PHONE_NUMBER);
            }

            Users users = new Users(fullName, email, hashedPassword, phoneNumber, false);
            usersRepository.save(users);
            return ResponseEntity.ok(RESPONSE_ADD_USER_SUCCESS);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(RESPONSE_ADD_USER_SUCCESS);
        }
    }

    @PostMapping("${endpoint.admin.edit-permission}")
    public ResponseEntity<?> editPermission(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));
        boolean isAdmin = Boolean.parseBoolean(request.getParameter(PARAM_IS_ADMIN));

        Users user = usersRepository.findUsersByUserID(userID);

        user.setIsAdmin(isAdmin);
        usersRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("${endpoint.admin.edit-user}")
    public ResponseEntity<?> editUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));
        String email = request.getParameter(PARAM_EMAIL);
        String fullName = request.getParameter(PARAM_FULL_NAME);
        String gender = request.getParameter(PARAM_GENDER);
        String newPassword = request.getParameter(PARAM_NEW_PASSWORD);
        String phoneNumber = request.getParameter(PARAM_PHONE_NUMBER);
        boolean isAdmin = Boolean.parseBoolean(request.getParameter(PARAM_IS_ADMIN));

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
            jsonData = objectMapper.readValue(request.getParameter(PARAM_DATE_BIRTHDAY),
                    new TypeReference<Map<String, Object>>() {
                    });
            day = (String) jsonData.get(PARAM_DAY);
            month = (String) jsonData.get(PARAM_MONTH);
            year = (String) jsonData.get(PARAM_YEAR);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        user.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));

        usersRepository.save(user);
        ResponseObject responseObject = new ResponseObject(RESPONSE_EDIT_USER_SUCCESS);
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("${endpoint.admin.delete-user}")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));

        Users user = usersRepository.findUsersByUserID(userID);

        usersRepository.delete(user);

        ResponseObject responseObject = new ResponseObject(RESPONSE_DELETE_USER_SUCCESS);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("${endpoint.admin.search-user-by-email}")
    public ResponseEntity<?> searchUserByEmail(HttpServletRequest request) {
        String email = request.getParameter(PARAM_EMAIL);

        Users users = usersRepository.findUsersByEmail(email);
        return ResponseEntity.ok(users);
    }

    @GetMapping("${endpoint.admin.search-user-by-phone-number}")
    public ResponseEntity<?> searchUserByPhoneNumber(HttpServletRequest request) {
        String phoneNumber = request.getParameter(PARAM_PHONE_NUMBER);

        List<Users> users = usersRepository.findUsersByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(users);
    }

    @PostMapping("${endpoint.admin.upload-profile-image}")
    public ResponseEntity<?> uploadProfileImage(HttpServletRequest request) throws IOException {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("profileImage");
        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_INVALID_TOKEN);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users usersByEmail = usersRepository.findUsersByEmail(email);
        if (usersByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAdmin = usersByEmail.getIsAdmin();
        if (isAdmin || Objects.equals(usersByEmail.getUserID(), userID)) {
            List<String> paths = new ArrayList<>();
            for (MultipartFile image : images) {
                String url = freeImageService.uploadImageToFreeImage(image.getBytes());
                paths.add(url);
            }

            Users usersByUserID = usersRepository.findUsersByUserID(userID);
            usersByUserID.setAvatarPath(paths.get(0));
            usersRepository.save(usersByUserID);

            ResponseObject responseObject = new ResponseObject(RESPONSE_UPLOAD_IMAGE_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
