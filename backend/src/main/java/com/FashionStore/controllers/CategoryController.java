package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.CategoryRepository;
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
        Long parentCategoryID = Long.valueOf(request.getParameter("parentCategoryID"));

        List<Category> categoryList = categoryRepository.findCategoriesByCategoryName(categoryName);

        if (!categoryList.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Danh mục mới đã tồn tại!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            Category category;
            if (parentCategoryID == 0) category = new Category(categoryName);
            else category = new Category(categoryName, parentCategoryID);
            categoryRepository.save(category);
            ResponseObject responseObject = new ResponseObject("Đã thêm danh mục mới thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Không thể lưu danh mục vào database");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @GetMapping("/get-category")
    public ResponseEntity<List<CategoryResponse>> getCategory() {
        List<Category> categoryList = categoryRepository.findCategoriesByParentCategoryID(null);

        List<CategoryResponse> categoryResponses = new ArrayList<>();

        for (Category category : categoryList) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setCategoryID(category.getCategoryID());
            categoryResponse.setCategoryName(category.getCategoryName());

            List<Category> subCategoryResponses = categoryRepository.findCategoriesByParentCategoryID(category.getCategoryID());
            categoryResponse.setSubcategories(subCategoryResponses);
            categoryResponses.add(categoryResponse);
        }

        return ResponseEntity.ok(categoryResponses);
    }
}

class CategoryResponse {
    private Long categoryID;
    private String categoryName;
    private List<Category> subcategories;

    public Long getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Category> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(List<Category> subcategories) {
        this.subcategories = subcategories;
    }
}