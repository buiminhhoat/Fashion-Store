package com.FashionStore.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @GetMapping("/admin/**")
    public String admin() {
        return "index"; // Trả về tên của trang chủ (index.html)
    }
}

