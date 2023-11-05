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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;


    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductImageRepository productImageRepository,
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

    @PostMapping("/add-product")
    public ResponseEntity<?> addProduct(HttpServletRequest request) {
        String productName = request.getParameter("productName");
        Double productPrice = Double.valueOf(request.getParameter("productPrice"));
        String productDescription = request.getParameter("productDescription");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("productImages");
        Long parentCategoryID = Long.valueOf(request.getParameter("ParentCategoryID"));
        Long categoryID = Long.valueOf(request.getParameter("CategoryID"));

        String jsonSizeNameJson = request.getParameter("productSize");

        String productSizeQuantityJson = request.getParameter("productSizeQuantity");
        String jsonListParam = request.getParameter("productSizeQuantity");
        ObjectMapper objectMapper = new ObjectMapper();
        List<ProductSizeQuantity> productSizeQuantities;
        try {
            productSizeQuantities = objectMapper.readValue(jsonListParam, new TypeReference<List<ProductSizeQuantity>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        List<String> paths = new ArrayList<>();
        String appRoot = System.getProperty("user.dir") + File.separator;
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
                // Lưu đường dẫn của ảnh vào database (thực hiện thao tác lưu vào database tại đây)
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }


        Product product = new Product(productName, productPrice, productDescription);
        productRepository.save(product);
        Long productId = product.getProductID();

        for (String imagePath: paths) {
            ProductImage productImage = new ProductImage(productId, imagePath);
            productImageRepository.save(productImage);
        }

        ProductCategory productCategory = new ProductCategory(productId, categoryID, parentCategoryID);
        productCategoryRepository.save(productCategory);

        for (ProductSizeQuantity productSizeQuantity: productSizeQuantities) {
            ProductSize productSize = new ProductSize(productId, productSizeQuantity.getSizeName());
            productSizeRepository.save(productSize);
            Long sizeID = productSize.getSizeID();
            ProductQuantity productQuantity = new ProductQuantity(productId, sizeID,
                    Long.valueOf(productSizeQuantity.getQuantity()));
            productQuantityRepository.save(productQuantity);
        }
        ResponseObject responseObject = new ResponseObject("Đã thêm sản phẩm thành công");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/search/{productName}")
    public ResponseEntity<?> searchProductByProductName(@PathVariable String productName) {
        List<Product> products = productRepository.findProductsByProductNameContaining(productName);
        for (Product product: products) {
            product = getProductDetails(product.getProductID());
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/product/{productID}")
    public ResponseEntity<?> searchProductByProductName(@PathVariable Long productID) {
        Product product = productRepository.findProductByProductID(productID);
        product = getProductDetails(product.getProductID());
        return ResponseEntity.ok(product);
    }

    public Product getProductDetails(Long productID) {
        Product product = productRepository.findProductByProductID(productID);

        List<ProductImage> productImages = productImageRepository.findProductImageByProductID(productID);
        product.setProductImages(productImages);

        List<ProductSize> productSizes = productSizeRepository.findProductSizeByProductID(productID);
        product.setProductSizes(productSizes);

        List<ProductQuantity> productQuantities = productQuantityRepository.findProductQuantitiesByProductID(productID);
        product.setProductQuantities(productQuantities);

        ProductCategory productCategory = productCategoryRepository.findProductCategoriesByProductID(productID);

        Category category = categoryRepository.findCategoriesByCategoryID(productCategory.getCategoryID());
        product.setCategory(category);

        Category parentCategory = categoryRepository.findCategoriesByCategoryID(productCategory.getParentCategoryID());
        product.setParentCategory(parentCategory);
        return product;
    }
}

