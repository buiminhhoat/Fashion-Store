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
    private final ProductRepository productRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductImageRepository productImageRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

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

    @PostMapping("/admin/add-category")
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

    @PostMapping("/admin/edit-category")
    public ResponseEntity<?> editCategory(HttpServletRequest request) {
        Long categoryID = Long.valueOf(request.getParameter("categoryID"));
        String categoryName = request.getParameter("categoryName");

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject("Danh mục không tồn tại!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            category.setCategoryName(categoryName);
            categoryRepository.save(category);
            ResponseObject responseObject = new ResponseObject("Chỉnh sửa danh mục thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Không thể chỉnh sửa danh mục trong database");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("/admin/delete-category")
    public ResponseEntity<?> deleteCategory(HttpServletRequest request) {
        Long categoryID = Long.valueOf(request.getParameter("categoryID"));

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject("Danh mục không tồn tại!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            categoryRepository.delete(category);
            ResponseObject responseObject = new ResponseObject("Xóa danh mục thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Không thể xóa danh mục trong database");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("/admin/upload-category-image")
    public ResponseEntity<?> uploadCategoryImage(HttpServletRequest request) {
        Long categoryID = Long.valueOf(request.getParameter("categoryID"));
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("categoryImage");

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject("Danh mục không tồn tại!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String originalFilename = image.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            }
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;

            try {
                String imagePath = appRoot + UPLOAD_DIR + File.separator + fileName;
                Path path = Paths.get(imagePath);
                image.transferTo(path.toFile());
                paths.add(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        category.setImagePath(paths.get(0));
        categoryRepository.save(category);
        ResponseObject responseObject = new ResponseObject("Cập nhật ảnh danh mục thành công");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/public/get-all-categories")
    public ResponseEntity<List<Category>> getCategory() {
        List<Category> categoryList = categoryRepository.findCategoriesByParentCategoryID(null);

        List<Category> categories = new ArrayList<>();

        for (Category category: categoryList) {
            Category temp = category;

            List<Category> subCategory = categoryRepository.findCategoriesByParentCategoryID(category.getCategoryID());
            temp.setSubCategories(subCategory);
            categories.add(temp);
        }

        return ResponseEntity.ok(categories);
    }

    @PostMapping("/public/category/{categoryID}")
    public ResponseEntity<?> getCategoryByCategoryID(HttpServletRequest request, @PathVariable Long categoryID) {
        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);
        category.setProducts(getProductsInCategory(categoryID));
        return ResponseEntity.ok(category);
    }

    @GetMapping("/public/all-categories/get-random-12-products")
    public ResponseEntity<?> getAllCategoriesRandom12() {
        List<Category> categoryList = categoryRepository.findCategoriesByParentCategoryID(null);

        List<Category> categories = new ArrayList<>();

        for (Category category : categoryList) {
            Category temp = new Category();
            temp.setCategoryID(category.getCategoryID());
            temp.setCategoryName(category.getCategoryName());
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
            temp.setSubCategories(subCategoryList);
            categories.add(temp);
        }
        return ResponseEntity.ok(categories);
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

    public List<Product> getProductsInCategory(Long categoryID) {
        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);
        List<Product> products = new ArrayList<>();
        if (category.getParentCategoryID() == null) {
            List<Category> subCategories = categoryRepository.findCategoriesByParentCategoryID(categoryID);
            for (Category subCategory: subCategories) {
                List<ProductCategory> productCategoryList = productCategoryRepository.findProductCategoriesByCategoryID(subCategory.getCategoryID());
                for (ProductCategory productCategory : productCategoryList) {
                    Long productID = productCategory.getProductID();
                    products.add(getProduct(productID));
                }
            }
        }
        else {
            List<ProductCategory> productCategoryList = productCategoryRepository.findProductCategoriesByCategoryID(categoryID);
            for (ProductCategory productCategory : productCategoryList) {
                Long productID = productCategory.getProductID();
                products.add(getProduct(productID));
            }
        }
        return products;
    }

    @GetMapping("/public/search/category")
    public ResponseEntity<?> searchCategory(HttpServletRequest request) {
        String categoryName = request.getParameter("categoryName");
        List<Category> categories = categoryRepository.findCategoriesByParentCategoryID(null);
        List<Category> result = new ArrayList<>();
        for (Category category: categories) {
            if (category.getParentCategoryID() != null) continue;
            List<Category> subCategoryList = categoryRepository.findCategoriesByParentCategoryID(category.getCategoryID());
            List<Category> resultSubCategoryList = new ArrayList<>();
            for (Category subCategory: subCategoryList) {
                if (subCategory.getCategoryName().contains(categoryName)) {
                    resultSubCategoryList.add(subCategory);
                }
            }
            if (!resultSubCategoryList.isEmpty()) {
                category.setSubCategories(resultSubCategoryList);
                result.add(category);
            }
        }
        return ResponseEntity.ok(result);
    }
}
