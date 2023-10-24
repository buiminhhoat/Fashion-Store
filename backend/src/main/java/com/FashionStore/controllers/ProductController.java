package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.ProductCategoryRepository;
import com.FashionStore.repositories.ProductImageRepository;
import com.FashionStore.repositories.ProductRepository;
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

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductImageRepository productImageRepository,
                             ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> addProduct(HttpServletRequest request) {
        String productSizeQuantityJson = request.getParameter("productSizeQuantity");
        String jsonListParam = request.getParameter("productSizeQuantity");
        ObjectMapper objectMapper = new ObjectMapper();
        List<ProductSizeQuantity> productSizeQuantities;
        try {
            productSizeQuantities = objectMapper.readValue(jsonListParam, new TypeReference<List<ProductSizeQuantity>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String productName = request.getParameter("productName");
        Double productPrice = Double.valueOf(request.getParameter("productPrice"));
        String productDescription = request.getParameter("productDescription");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("productImages");
        Long parentCategoryID = Long.valueOf(request.getParameter("ParentCategoryID"));
        Long categoryID = Long.valueOf(request.getParameter("CategoryID"));

        String jsonSizeNameJson = request.getParameter("productSize");

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

        // Lưu categoryName và đường dẫn ảnh vào database (nếu cần)

        Product product = new Product(productName, productPrice, productDescription);
        productRepository.save(product);
        Long productId = product.getProductID();

        for (String imagePath: paths) {
            ProductImage productImage = new ProductImage(productId, imagePath);
            productImageRepository.save(productImage);
        }

        ProductCategory productCategory = new ProductCategory(productId, categoryID, parentCategoryID);
        productCategoryRepository.save(productCategory);

        ResponseObject responseObject = new ResponseObject("Đã thêm sản phẩm thành công");
        return ResponseEntity.ok(responseObject);
    }
}

class ProductSizeQuantity {
    private String sizeName;

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public ProductSizeQuantity() {

    }
    public ProductSizeQuantity(String sizeName) {
        this.sizeName = sizeName;
    }
}