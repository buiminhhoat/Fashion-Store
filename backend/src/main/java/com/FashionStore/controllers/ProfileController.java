package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class ProfileController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UsersRepository usersRepository;

    @Value("${header.authorization}")
    private String HEADER_AUTHORIZATION;

    @Value("${authorization.bearer}")
    private String AUTHORIZATION_BEARER;

    @Value("${param.email}")
    private String PARAM_EMAIL;

    @Value("${param.userID}")
    private String PARAM_USER_ID;

    @Value("${param.fullName}")
    private String PARAM_FULL_NAME;

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

    @Value("${param.oldPassword}")
    private String PARAM_OLD_PASSWORD;

    @Value("${param.newPassword}")
    private String PARAM_NEW_PASSWORD;

    private final String RESPONSE_PROFILE_UPDATE_SUCCESS;

    private final String RESPONSE_PASSWORD_CHANGE_SUCCESS;

    private final String RESPONSE_PASSWORD_INCORRECT;

    @Autowired
    public ProfileController(MessageSource messageSource) {
        this.RESPONSE_PROFILE_UPDATE_SUCCESS = messageSource.getMessage("response.profile.update.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_PASSWORD_CHANGE_SUCCESS = messageSource.getMessage("response.password.change.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_PASSWORD_INCORRECT = messageSource.getMessage("response.password.incorrect", null, LocaleContextHolder.getLocale());
    }

    @PostMapping("${endpoint.public.edit-profile}")
    public ResponseEntity<?> editProfile(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = request.getParameter(PARAM_EMAIL);
        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));

        String fullName = request.getParameter(PARAM_FULL_NAME);
        String gender = request.getParameter(PARAM_GENDER);
        Map<String, Object> jsonData = new HashMap<>();
        String day = "", month = "", year = "";

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.readValue(request.getParameter(PARAM_DATE_BIRTHDAY), new TypeReference<Map<String, Object>>() {});
            day = (String) jsonData.get(PARAM_DAY);
            month = (String) jsonData.get(PARAM_MONTH);
            year = (String) jsonData.get(PARAM_YEAR);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Users usersByEmail = usersRepository.findUsersByEmail(email);

        boolean isAdmin = usersByEmail.getIsAdmin();

        if (isAdmin || Objects.equals(usersByEmail.getUserID(), userID)) {
            Users usersByUserID = usersRepository.findUsersByUserID(userID);
            usersByUserID.setFullName(fullName);
            usersByUserID.setGender(gender);
            usersByUserID.setDateBirthday(new Date(Integer.parseInt(year) - 1900, Integer.parseInt(month) - 1, Integer.parseInt(day)));
            usersRepository.save(usersByUserID);
            ResponseObject responseObject = new ResponseObject(RESPONSE_PROFILE_UPDATE_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("${endpoint.public.change-password}")
    public ResponseEntity<?> changePassword(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        String oldPassword = request.getParameter(PARAM_OLD_PASSWORD);
        String newPassword = request.getParameter(PARAM_NEW_PASSWORD);

        Long userID = Long.valueOf(request.getParameter(PARAM_USER_ID));

        Users usersByEmail = usersRepository.findUsersByEmail(email);

        boolean isAdmin = usersByEmail.getIsAdmin();

        if (Objects.equals(usersByEmail.getUserID(), userID) || isAdmin) {
            Users usersByUserID = usersRepository.findUsersByUserID(userID);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (!passwordEncoder.matches(oldPassword, usersByUserID.getHashedPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(RESPONSE_PASSWORD_INCORRECT);
            }
            usersByUserID.setHashedPassword(passwordEncoder.encode(newPassword));
            usersRepository.save(usersByUserID);
            return ResponseEntity.ok(RESPONSE_PASSWORD_CHANGE_SUCCESS);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
