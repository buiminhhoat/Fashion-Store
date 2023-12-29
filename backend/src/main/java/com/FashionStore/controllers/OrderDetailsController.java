package com.FashionStore.controllers;

import com.FashionStore.repositories.*;
import com.FashionStore.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class OrderDetailsController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Autowired
    public OrderDetailsController(ProductRepository productRepository, ProductImageRepository productImageRepository,
                                  ProductCategoryRepository productCategoryRepository,
                                  ProductSizeRepository productSizeRepository,
                                  ProductQuantityRepository productQuantityRepository,
                                  CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
    }
}

