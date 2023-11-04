package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.*;
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
    private final ProductRepository productRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductImageRepository productImageRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository, ProductRepository productRepository,
                              ProductCategoryRepository productCategoryRepository,
                              ProductImageRepository productImageRepository,
                              ProductSizeRepository productSizeRepository,
                              ProductQuantityRepository productQuantityRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
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

    @GetMapping("/all-categories/get-random-12-products")
    public ResponseEntity<?> getAllCategoriesRandom12() {
        List<Category> categoryList = categoryRepository.findCategoriesByParentCategoryID(null);

        List<CategoryResponse> categoryResponses = new ArrayList<>();

        for (Category category : categoryList) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setCategoryID(category.getCategoryID());
            categoryResponse.setCategoryName(category.getCategoryName());

            List<Category> subCategoryList = categoryRepository.findCategoriesByParentCategoryID(category.getCategoryID());
            for (Category subCategory: subCategoryList) {
                Long categoryID = subCategory.getCategoryID();
                List<ProductCategory> productCategoryList = productCategoryRepository.findProductCategoriesByCategoryID(categoryID);
                List<Product> products = new ArrayList<>();
                for (ProductCategory productCategory: productCategoryList) {
                    products.add(getProduct(productCategory.getProductID()));
                }
                subCategory.setProducts(products);
            }
            categoryResponse.setSubcategories(subCategoryList);
            categoryResponses.add(categoryResponse);
        }
        return ResponseEntity.ok(categoryResponses);
    }

    public Product getProduct(Long productID) {
        Product product = productRepository.findProductByProductID(productID);

        List<ProductImage> productImages = productImageRepository.findProductImageByProductID(productID);
        product.setProductImages(productImages);

        List<ProductSize> productSizes = productSizeRepository.findProductSizeByProductID(productID);
        product.setProductSizes(productSizes);

        List<ProductQuantity> productQuantities = productQuantityRepository.findProductQuantitiesByProductID(productID);
        product.setProductQuantities(productQuantities);

        return product;
    }
}
