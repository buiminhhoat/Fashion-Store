package com.FashionStore.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @Value("${frontend.index-page}")
    private String indexPage;

    @GetMapping({
            "${frontend.admin-url}",
            "${frontend.category-url}",
            "${frontend.product-url}",
            "${frontend.profile-url}",
            "${frontend.cart-url}",
            "${frontend.checkout-url}",
            "${frontend.search-url}"
    })
    public String frontend() {
        return indexPage;
    }
}
