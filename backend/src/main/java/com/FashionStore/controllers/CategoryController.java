package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.CategoryRepository;
import com.FashionStore.repositories.ProductCategoryRepository;
import com.FashionStore.repositories.ProductImageRepository;
import com.FashionStore.repositories.ProductRepository;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
public class CategoryController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final CategoryRepository categoryRepository;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/add-category")
    public ResponseEntity<?> addCategory(HttpServletRequest request) {
        String categoryName = request.getParameter("categoryName");

        List<Category> categoryList = categoryRepository.findCategoriesByCategoryName(categoryName);

        if (!categoryList.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Danh mục mới đã tồn tại!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            Category category = new Category(categoryName, null);
            categoryRepository.save(category);
            ResponseObject responseObject = new ResponseObject("Đã thêm danh mục mới thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Không thể lưu danh mục vào database");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }
}