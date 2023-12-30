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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UsersRepository usersRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    private String LOGIN_FAILED;

    @Value("${response.token.access}")
    private String TOKEN_ACCESS;

    @Value("${response.token.refresh}")
    private String TOKEN_REFRESH;

    private final String LOGIN_SUCCESS;

    private final String RESPONSE_ERROR;

    @Value("${endpoint.public.login}")
    private String ENDPOINT_LOGIN;


    @Value("${endpoint.google.token-info}")
    private String ENDPOINT_GOOGLE_TOKEN_INFO;

    @Value("${param.email}")
    private String PARAM_EMAIL;

    @Value("${param.phoneNumber}")
    private String PARAM_PHONE_NUMBER;

    @Value("${param.password}")
    private String PARAM_PASSWORD;

    private final String REGISTER_EMAIL_EXISTS;

    private final String REGISTER_PHONE_EXISTS;

    private final String REGISTER_SUCCESS;

    private final String REGISTER_FAILED;

    @Value("${header.authorization}")
    private String HEADER_AUTHORIZATION;

    @Value("${authorization.bearer}")
    private String AUTHORIZATION_BEARER;

    private String JSON_ERROR;

    @Value("${json.email}")
    private String JSON_EMAIL;

    @Value("${json.name}")
    private String JSON_NAME;

    @Value("${json.picture}")
    private String JSON_PICTURE;

    private final String AVATAR_DOWNLOAD_FAILED;

    private final String REQUEST_ERROR;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(UsersRepository usersRepository, MessageSource messageSource) {
        this.usersRepository = usersRepository;
        this.LOGIN_FAILED = messageSource.getMessage("response.login.failed", null, LocaleContextHolder.getLocale());
        this.LOGIN_SUCCESS = messageSource.getMessage("response.login.success", null, LocaleContextHolder.getLocale());
        this.REGISTER_EMAIL_EXISTS = messageSource.getMessage("response.register.email.exists", null, LocaleContextHolder.getLocale());
        this.REGISTER_PHONE_EXISTS = messageSource.getMessage("response.register.phone.exists", null, LocaleContextHolder.getLocale());
        this.REGISTER_SUCCESS = messageSource.getMessage("response.register.success", null, LocaleContextHolder.getLocale());
        this.REGISTER_FAILED = messageSource.getMessage("response.register.failed", null, LocaleContextHolder.getLocale());
        this.AVATAR_DOWNLOAD_FAILED = messageSource.getMessage("response.avatar.download.failed", null, LocaleContextHolder.getLocale());
        this.REQUEST_ERROR = messageSource.getMessage("response.request.error", null, LocaleContextHolder.getLocale());
        this.JSON_ERROR = messageSource.getMessage("response.json.error", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ERROR = messageSource.getMessage("response.error", null, LocaleContextHolder.getLocale());
    }

    @PostMapping("${endpoint.public.login}")
    public ResponseEntity<?> login(HttpServletRequest request) {
        String email = request.getParameter(PARAM_EMAIL);
        String phoneNumber = request.getParameter(PARAM_PHONE_NUMBER);

        String plainPassword = request.getParameter(PARAM_PASSWORD);

        Users findByEmail = usersRepository.findUsersByEmail(email);
        Users findByPhoneNumber = usersRepository.findUsersByEmail(phoneNumber);

        if (findByEmail == null && findByPhoneNumber == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(LOGIN_FAILED);
        }

        Users user = (findByEmail != null) ? findByEmail : findByPhoneNumber;

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(plainPassword, user.getHashedPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(LOGIN_FAILED);
        }

        String accessToken = jwtTokenUtil.generateAccessToken(email);
        String refreshToken = jwtTokenUtil.generateRefreshToken(email);

        Map<String, String> tokens = new HashMap<>();
        tokens.put(TOKEN_ACCESS, accessToken);
        tokens.put(TOKEN_REFRESH, refreshToken);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(), LOGIN_SUCCESS, tokens));
    }

    @PostMapping("${endpoint.public.refresh}")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String refreshToken = request.getHeader(HEADER_AUTHORIZATION);
        refreshToken = refreshToken.replace(AUTHORIZATION_BEARER, "");

        if (jwtTokenUtil.isTokenExpired(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtTokenUtil.getSubjectFromToken(refreshToken);
        String newAccessToken = jwtTokenUtil.generateAccessToken(username);

        Map<String, String> tokens = new HashMap<>();
        tokens.put(TOKEN_ACCESS, newAccessToken);

        return ResponseEntity.ok(tokens);
    }

    @PostMapping("${endpoint.public.register}")
    public ResponseEntity<String> registerUser(HttpServletRequest request) {
        try {
            String fullName = request.getParameter("${param.fullName}");
            String email = request.getParameter(PARAM_EMAIL);
            String phoneNumber = request.getParameter(PARAM_PHONE_NUMBER);
            String plainPassword = request.getParameter("${param.hashedPassword}");

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(plainPassword);

            Users findByEmail = usersRepository.findUsersByEmail(email);
            List<Users> findByPhoneNumber = usersRepository.findUsersByPhoneNumber(phoneNumber);

            if (findByEmail != null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(REGISTER_EMAIL_EXISTS);
            }

            if (!findByPhoneNumber.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(REGISTER_PHONE_EXISTS);
            }

            Users users = new Users(fullName, email, hashedPassword, phoneNumber, false);
            usersRepository.save(users);
            return ResponseEntity.ok(REGISTER_SUCCESS);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(REGISTER_FAILED);
        }
    }

    @GetMapping("${endpoint.public.login-with-google}")
    public ResponseEntity<?> loginWithGoogle(HttpServletRequest request) {
        String idToken = request.getHeader(HEADER_AUTHORIZATION);
        idToken = idToken.replace(AUTHORIZATION_BEARER, "");
        String uri = ENDPOINT_GOOGLE_TOKEN_INFO + idToken;
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String resultJson = restTemplate.getForObject(uri, String.class);

                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode resultNode;
                try {
                    resultNode = objectMapper.readTree(resultJson);
                } catch (Exception e) {
                    return ResponseEntity.status(500).body(JSON_ERROR);
                }

                String email = resultNode.path(JSON_EMAIL).asText();
                String name = resultNode.path(JSON_NAME).asText();
                String avatarUrl = resultNode.path(JSON_PICTURE).asText();
                Users findByEmail = usersRepository.findUsersByEmail(email);
                if (findByEmail == null) {
                    Users users = new Users(name, email, jwtTokenUtil.generateAccessToken(email), "", false);
                    users.setAvatarPath(avatarUrl);
                    usersRepository.save(users);
                }

                String accessToken = jwtTokenUtil.generateAccessToken(email);
                String refreshToken = jwtTokenUtil.generateRefreshToken(email);

                Map<String, String> tokens = new HashMap<>();
                tokens.put(TOKEN_ACCESS, accessToken);
                tokens.put(TOKEN_REFRESH, refreshToken);
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(HttpStatus.OK.toString(), LOGIN_SUCCESS, tokens));
            } else {
                return ResponseEntity.status(responseEntity.getStatusCode()).body(RESPONSE_ERROR + ": " + responseEntity.getStatusCodeValue());
            }
        } catch (HttpStatusCodeException e) {
            return ResponseEntity.status(e.getStatusCode()).body(RESPONSE_ERROR + ": " + e.getStatusCode().value());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(REQUEST_ERROR);
        }
    }
}
