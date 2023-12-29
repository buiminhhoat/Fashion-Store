package com.FashionStore.controllers;

import com.FashionStore.models.Banner;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.StoreInformation;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StoreInformationController {
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


    private final StoreInformationRepository storeInformationRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Autowired
    public StoreInformationController(ProductRepository productRepository,
                                      ProductImageRepository productImageRepository,
                                      ProductCategoryRepository productCategoryRepository,
                                      ProductSizeRepository productSizeRepository,
                                      ProductQuantityRepository productQuantityRepository,
                                      CategoryRepository categoryRepository,
                                      CartItemRepository cartItemRepository,
                                      BannerRepository bannerRepository,
                                      StoreInformationRepository storeInformationRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
        this.cartItemRepository = cartItemRepository;
        this.bannerRepository = bannerRepository;
        this.storeInformationRepository = storeInformationRepository;
    }

    @PostMapping("/admin/update-store-information")
    public ResponseEntity<?> updateStoreInformation(HttpServletRequest request) {
        String storeInformationJson = request.getParameter("storeInformation");
        ObjectMapper objectMapper = new ObjectMapper();

        StoreInformation storeInformation;
        try {
            storeInformation = objectMapper.readValue(storeInformationJson, new TypeReference<StoreInformation>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        storeInformationRepository.deleteAll();;

        storeInformationRepository.save(storeInformation);
        ResponseObject responseObject = new ResponseObject("Đã cập nhật thông tin cửa hàng thành công");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/public/get-store-information")
    public ResponseEntity<?> getStoreInformation(HttpServletRequest request) {
        List<StoreInformation> storeInformations = storeInformationRepository.findAll();
        if (storeInformations.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Vui lòng tạo thông tin cửa hàng");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        StoreInformation storeInformation = storeInformations.get(0);
        if (storeInformation != null) {
            ResponseObject responseObject = new ResponseObject("Đã lấy thông tin cửa hàng thành công", storeInformation);
            return ResponseEntity.ok(responseObject);
        }
        else {
            ResponseObject responseObject = new ResponseObject("Vui lòng tạo thông tin cửa hàng");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }
}

