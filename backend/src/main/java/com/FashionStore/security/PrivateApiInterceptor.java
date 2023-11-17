package com.FashionStore.security;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.UsersRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class PrivateApiInterceptor implements HandlerInterceptor {

    private final UsersRepository usersRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public PrivateApiInterceptor(UsersRepository usersRepository, JwtTokenUtil jwtTokenUtil) {
        this.usersRepository = usersRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

        String accessToken = request.getHeader("Authorization");
        if (accessToken == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        Users users = usersRepository.findUsersByEmail(email);
        if (users.getIsAdmin()) {
            return true;
        }
        else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        // Các xử lý sau khi xử lý request (chưa gửi response)
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // Các xử lý sau khi đã gửi response
    }
}