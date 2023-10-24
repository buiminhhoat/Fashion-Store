package com.FashionStore.controllers;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductImage;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.repositories.ProductImageRepository;
import com.FashionStore.repositories.ProductRepository;
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
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @Value("${upload.dir}")
    String UPLOAD_DIR;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> uploadFiles(HttpServletRequest request) {
        String productName = request.getParameter("productName");
        Double productPrice = Double.valueOf(request.getParameter("productPrice"));
        String productDescription = request.getParameter("productDescription");

        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("productImages");

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        List<String> paths = new ArrayList<>();
        String appRoot = System.getProperty("user.dir") + "\\";
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
                paths.add(imagePath);
                // Lưu đường dẫn của ảnh vào database (thực hiện thao tác lưu vào database tại đây)
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
            }
        }

        // Lưu categoryName và đường dẫn ảnh vào database (nếu cần)

        Product product = new Product(productName, productPrice, productDescription);
        productRepository.save(product);
        Long productId = product.getProductID();
        System.out.println(productId);

        for (String imagePath: paths) {
            ProductImage productImage = new ProductImage(productId, imagePath);
            productImageRepository.save(productImage);
        }
        ResponseObject responseObject = new ResponseObject("Thông tin đã được cập nhật");
        return ResponseEntity.ok(responseObject);
    }
}