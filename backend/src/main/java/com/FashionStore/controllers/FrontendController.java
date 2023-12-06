package com.FashionStore.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping(
            {
                    "/admin/**",
                    "/category/**",
                    "/product/**",
                    "/profile/**",
                    "/cart/**",
                    "/checkout/**",
            })
    public String frontend() {
        return "index";
    }
}

