package com.FashionStore.security;

import com.FashionStore.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final UsersRepository usersRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WebConfig(UsersRepository usersRepository, JwtTokenUtil jwtTokenUtil) {
        this.usersRepository = usersRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new PrivateApiInterceptor(usersRepository, jwtTokenUtil))
                .addPathPatterns("/api/admin/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type");
    }
}