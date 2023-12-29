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
public class ProductController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;

    private final CartItemRepository cartItemRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    private FreeImageService freeImageService;

    @Autowired
    public ProductController(ProductRepository productRepository,
                             ProductImageRepository productImageRepository,
                             ProductCategoryRepository productCategoryRepository,
                             ProductSizeRepository productSizeRepository,
                             ProductQuantityRepository productQuantityRepository,
                             CategoryRepository categoryRepository,
                             CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
        this.cartItemRepository = cartItemRepository;
    }

    private String convertToBase64(MultipartFile image) throws IOException {
        return java.util.Base64.getEncoder().encodeToString(image.getBytes());
    }

    @PostMapping("/admin/add-product")
    public ResponseEntity<?> addProduct(HttpServletRequest request) throws IOException {
        String productName = request.getParameter("productName");
        Long productPrice = Long.valueOf(request.getParameter("productPrice"));
        String productDescription = request.getParameter("productDescription");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("productImages");
        Long parentCategoryID = Long.valueOf(request.getParameter("ParentCategoryID"));
        Long categoryID = Long.valueOf(request.getParameter("CategoryID"));
        String productSizesJson = request.getParameter("productSizes");
        String productQuantitiesJson = request.getParameter("productQuantities");
        ObjectMapper objectMapper = new ObjectMapper();

        List<ProductSize> productSizes;
        try {
            productSizes = objectMapper.readValue(productSizesJson, new TypeReference<List<ProductSize>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        List<ProductQuantity> productQuantities;
        try {
            productQuantities = objectMapper.readValue(productQuantitiesJson, new TypeReference<List<ProductQuantity>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = freeImageService.uploadImageToFreeImage(image.getBytes());
            paths.add(url);
        }


        Product product = new Product(productName, productPrice, productDescription);
        productRepository.save(product);
        Long productId = product.getProductID();

        for (String imagePath: paths) {
            ProductImage productImage = new ProductImage(productId, imagePath);
            productImageRepository.save(productImage);
        }

        ProductCategory productCategory = new ProductCategory(productId, categoryID);
        productCategoryRepository.save(productCategory);

        for (int i = 0; i < productSizes.size(); ++i) {
            ProductSize productSize = productSizes.get(i);
            productSize.setProductID(productId);
            productSizeRepository.save(productSize);

            Long sizeID = productSize.getSizeID();
            ProductQuantity productQuantity = productQuantities.get(i);
            productQuantity.setProductID(productId);
            productQuantity.setSizeID(sizeID);
            productQuantityRepository.save(productQuantity);
        }

        ResponseObject responseObject = new ResponseObject("Đã thêm sản phẩm thành công");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/admin/edit-product")
    public ResponseEntity<?> editProduct(HttpServletRequest request) throws IOException {
        Long productID = Long.valueOf(request.getParameter("productID"));
        String productName = request.getParameter("productName");
        Long productPrice = Long.valueOf(request.getParameter("productPrice"));
        String productDescription = request.getParameter("productDescription");
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles("productImages");
        Long parentCategoryID = Long.valueOf(request.getParameter("ParentCategoryID"));
        Long categoryID = Long.valueOf(request.getParameter("CategoryID"));
        String productSizesJson = request.getParameter("productSizes");
        String productQuantitiesJson = request.getParameter("productQuantities");
        ObjectMapper objectMapper = new ObjectMapper();

        List<ProductSize> productSizes;
        try {
            productSizes = objectMapper.readValue(productSizesJson, new TypeReference<List<ProductSize>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        List<ProductQuantity> productQuantities;
        try {
            productQuantities = objectMapper.readValue(productQuantitiesJson, new TypeReference<List<ProductQuantity>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            cleanProduct(productID);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.toString());
        }

        Product product = new Product(productName, productPrice, productDescription);

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = freeImageService.uploadImageToFreeImage(image.getBytes());
            paths.add(url);
        }

//        Product product = new Product(productID, productName, productPrice, productDescription);
        productRepository.save(product);
        Long productId = product.getProductID();

        for (String imagePath: paths) {
            ProductImage productImage = new ProductImage(productId, imagePath);
            productImageRepository.save(productImage);
        }

        ProductCategory productCategory = new ProductCategory(productId, categoryID);
        productCategoryRepository.save(productCategory);

        for (int i = 0; i < productSizes.size(); ++i) {
            ProductSize productSize = productSizes.get(i);
            productSize.setProductID(productId);
            productSizeRepository.save(productSize);

            Long sizeID = productSize.getSizeID();
            ProductQuantity productQuantity = productQuantities.get(i);
            productQuantity.setProductID(productId);
            productQuantity.setSizeID(sizeID);
            productQuantityRepository.save(productQuantity);
        }

        ResponseObject responseObject = new ResponseObject("Đã chỉnh sửa sản phẩm thành công");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/admin/delete-product")
    public ResponseEntity<?> deleteProduct(HttpServletRequest request) {
        Long productID = Long.valueOf(request.getParameter("productID"));

        try {
            cleanProduct(productID);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.toString());
        }

//        productRepository.delete(product);

        ResponseObject responseObject = new ResponseObject("Đã xóa sản phẩm thành công");
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/public/search/{productName}")
    public ResponseEntity<?> searchProductByProductName(HttpServletRequest request, @PathVariable String productName) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> products = new ArrayList<>();

        List<Pair<Long, Integer>> pairs = new ArrayList<>();

        productName = replaceVietnameseChars(productName);
        String[] productNameList = productName.split(" ");
        for (Product product : allProducts) {
            int count = 0;
            for (String word: productName.split(" ")) {
                if (replaceVietnameseChars(product.getProductName().toLowerCase()).contains(word.toLowerCase())) {
//                    matchingProducts.add(getProductDetails(product.getProductID()));
                    ++count;
                }
            }
            if (count > productNameList.length / 2)
                pairs.add(new Pair<>(product.getProductID(), count));
        }

        Collections.sort(pairs, new Comparator<Pair<Long, Integer>>() {
            @Override
            public int compare(Pair<Long, Integer> pair1, Pair<Long, Integer> pair2) {
                return pair2.getSecond().compareTo(pair1.getSecond());
            }
        });

        for (Pair<Long, Integer> pair: pairs) {
            products.add(getProductDetails(pair.getFirst()));
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/public/product/{productID}")
    public ResponseEntity<?> getProductByProductID(HttpServletRequest request, @PathVariable Long productID) {
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

        Category parentCategory = categoryRepository.findCategoriesByCategoryID(category.getParentCategoryID());
        product.setParentCategory(parentCategory);
        return product;
    }

    void cleanProduct(Long productID) throws IOException {
        /* Dọn rác */
        /* Dọn ảnh có trong database và storage - product Image */
        for (ProductImage productImage: productImageRepository.findProductImageByProductID(productID)) {
            String fileName = productImage.getImagePath();
            String filePathToDelete = appRoot + UPLOAD_DIR + File.separator + fileName;
            try {
                Path pathToDelete = Paths.get(filePathToDelete);
                Files.deleteIfExists(pathToDelete);
            } catch (IOException e) {
                throw e;
            }
            productImageRepository.delete(productImage);
        }

        try {
            /* Cart Item */
            cartItemRepository.deleteAll(cartItemRepository.findCartItemByProductID(productID));

            /* Product Category */
            ProductCategory productCategory = productCategoryRepository.findProductCategoriesByProductID(productID);
            if (productCategory != null)
                productCategoryRepository.delete(productCategory);

            /* Product Quantity*/
            productQuantityRepository.deleteAll(productQuantityRepository.findProductQuantitiesByProductID(productID));

            /* Product Size */
            productSizeRepository.deleteAll(productSizeRepository.findProductSizeByProductID(productID));

            // Xóa Product chính
            productRepository.deleteById(productID);
        }
        catch (Exception e) {
            throw e;
        }
    }

    private static String removeDiacritics(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("");
    }

    private String replaceVietnameseChars(String input) {
        input = input.toLowerCase();
        input = removeDiacritics(input);
        return input;
    }
}

