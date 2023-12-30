package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.CategoryRepository;
import com.FashionStore.repositories.ProductCategoryRepository;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class ProductCategoryController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryController(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }
}

