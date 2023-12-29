package com.FashionStore.controllers;

import com.FashionStore.freeimage.FreeImageService;
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
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class BannerController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;

    private final CartItemRepository cartItemRepository;

    private final BannerRepository bannerRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Autowired
    private FreeImageService freeImageService;

    @Autowired
    public BannerController(ProductRepository productRepository,
                            ProductImageRepository productImageRepository,
                            ProductCategoryRepository productCategoryRepository,
                            ProductSizeRepository productSizeRepository,
                            ProductQuantityRepository productQuantityRepository,
                            CategoryRepository categoryRepository,
                            CartItemRepository cartItemRepository,
                            BannerRepository bannerRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
        this.cartItemRepository = cartItemRepository;
        this.bannerRepository = bannerRepository;
    }

    @PostMapping("/admin/save-banner")
    public ResponseEntity<?> saveBanner(HttpServletRequest request) throws IOException {
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("bannerImages");
        String bannersJson = request.getParameter("banners");
        ObjectMapper objectMapper = new ObjectMapper();

        List<Banner> banners;
        try {
            banners = objectMapper.readValue(bannersJson, new TypeReference<List<Banner>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = freeImageService.uploadImageToFreeImage(image.getBytes());
            paths.add(url);
        }

        bannerRepository.deleteAll();;

        for (int i = 0; i < banners.size(); ++i) {
            Banner banner = banners.get(i);
            banner.setImagePath(paths.get(i));
            bannerRepository.save(banner);
        }
        ResponseObject responseObject = new ResponseObject("Đã lưu banner thành công");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/public/get-all-banners")
    public ResponseEntity<?> getAllBanners(HttpServletRequest request) {
        List<Banner> banners = bannerRepository.findAll();
        return ResponseEntity.ok(banners);
    }
}

