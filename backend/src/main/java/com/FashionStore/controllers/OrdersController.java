package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.*;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class OrdersController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;

    private final OrdersRepository ordersRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public OrdersController(ProductRepository productRepository, ProductImageRepository productImageRepository,
                            ProductCategoryRepository productCategoryRepository,
                            ProductSizeRepository productSizeRepository,
                            ProductQuantityRepository productQuantityRepository,
                            CategoryRepository categoryRepository,
                            OrdersRepository ordersRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
        this.ordersRepository = ordersRepository;
    }

    @PostMapping("/orders/{orderID}")
    public ResponseEntity<?> getOrdersByOrderID(HttpServletRequest request, @PathVariable Long orderID) {
        Orders orders = getOrderDetails(orderID);
        return ResponseEntity.ok(orders);
    }

    public Orders getOrderDetails(Long orderID) {
        Orders orders = ordersRepository.findOrdersByOrderID(orderID);
        return orders;
    }
}

