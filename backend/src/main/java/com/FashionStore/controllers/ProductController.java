package com.FashionStore.controllers;

import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.ProductsRepository;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductsRepository productsRepository;

    @Value("${upload.dir}")
    String UPLOAD_DIR;

    @Autowired
    public ProductController(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @PostMapping("/add-product")
    public ResponseEntity<String> uploadFiles(HttpServletRequest request) {
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("images");

        // Tạo thư mục lưu trữ ảnh nếu nó không tồn tại

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String appRoot = System.getProperty("user.dir") + "\\";

        // Duyệt qua từng tệp ảnh và lưu chúng vào thư mục trên máy chủ
        for (MultipartFile image : images) {
            String fileName = UUID.randomUUID().toString();

            try {
                Path path = Paths.get(appRoot + UPLOAD_DIR + File.separator + fileName);
                image.transferTo(path.toFile());

                // Lưu đường dẫn của ảnh vào database (thực hiện thao tác lưu vào database tại đây)
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        // Lưu categoryName và đường dẫn ảnh vào database (nếu cần)

        return ResponseEntity.ok("Upload successful!");
    }
}