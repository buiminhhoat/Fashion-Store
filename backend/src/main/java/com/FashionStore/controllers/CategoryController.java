package com.FashionStore.controllers;

import com.FashionStore.freeimage.FreeImageService;
import com.FashionStore.models.*;
import com.FashionStore.repositories.*;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class CategoryController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private ProductQuantityRepository productQuantityRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private FreeImageService freeImageService;

    private final String RESPONSE_CATEGORY_NEW_EXISTS;

    private final String RESPONSE_CATEGORY_SAVE_SUCCESS;

    private final String RESPONSE_CATEGORY_SAVE_ERROR;

    private final String RESPONSE_CATEGORY_EDIT_NOTFOUND;

    private final String RESPONSE_CATEGORY_EDIT_SUCCESS;

    private final String RESPONSE_CATEGORY_EDIT_ERROR;

    private final String RESPONSE_CATEGORY_DELETE_NOTFOUND;

    private final String RESPONSE_CATEGORY_DELETE_SUCCESS;

    private final String RESPONSE_CATEGORY_DELETE_ERROR;

    private final String RESPONSE_CATEGORY_IMAGE_SUCCESS;

    private final String RESPONSE_CATEGORY_IMAGE_ERROR;

    @Value("${param.categoryName}")
    private String PARAM_CATEGORY_NAME;

    @Value("${param.parentCategoryID}")
    private String PARAM_PARENT_CATEGORY_ID;

    @Value("${param.categoryID}")
    private String PARAM_CATEGORY_ID;

    @Value("${param.categoryImage}")
    private String PARAM_CATEGORY_IMAGE;

    @Value("${param.categoryImageDefault}")
    private String PARAM_CATEGORY_IMAGE_CATEGORY_DEFAULT;

    @Value("${param.maxProductDisplay}")
    private Long MAX_PRODUCT_DISPLAY;


    @Autowired
    public CategoryController(MessageSource messageSource) {
        this.RESPONSE_CATEGORY_NEW_EXISTS = messageSource.getMessage("response.category.new.exists", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_SAVE_SUCCESS = messageSource.getMessage("response.category.save.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_SAVE_ERROR = messageSource.getMessage("response.category.save.error", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_EDIT_NOTFOUND = messageSource.getMessage("response.category.edit.notfound", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_EDIT_SUCCESS = messageSource.getMessage("response.category.edit.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_EDIT_ERROR = messageSource.getMessage("response.category.edit.error", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_DELETE_NOTFOUND = messageSource.getMessage("response.category.delete.notfound", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_DELETE_SUCCESS = messageSource.getMessage("response.category.delete.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_DELETE_ERROR = messageSource.getMessage("response.category.delete.error", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_IMAGE_SUCCESS = messageSource.getMessage("response.category.image.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CATEGORY_IMAGE_ERROR = messageSource.getMessage("response.category.image.error", null, LocaleContextHolder.getLocale());
    }


    @PostMapping("${endpoint.admin.add-category}")
    public ResponseEntity<?> addCategory(HttpServletRequest request) {
        String categoryName = request.getParameter(PARAM_CATEGORY_NAME);
        Long parentCategoryID = Long.valueOf(request.getParameter(PARAM_PARENT_CATEGORY_ID));

        List<Category> categoryList = categoryRepository.findCategoriesByCategoryName(categoryName);

        if (!categoryList.isEmpty()) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_NEW_EXISTS);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            Category category;
            if (parentCategoryID == 0) category = new Category(categoryName, PARAM_CATEGORY_IMAGE_CATEGORY_DEFAULT);
            else category = new Category(categoryName, parentCategoryID, PARAM_CATEGORY_IMAGE_CATEGORY_DEFAULT);
            categoryRepository.save(category);
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_SAVE_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_SAVE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.admin.edit-category}")
    public ResponseEntity<?> editCategory(HttpServletRequest request) {
        Long categoryID = Long.valueOf(request.getParameter(PARAM_CATEGORY_ID));
        String categoryName = request.getParameter(PARAM_CATEGORY_NAME);

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_EDIT_NOTFOUND);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            category.setCategoryName(categoryName);
            categoryRepository.save(category);
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_EDIT_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_EDIT_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.admin.delete-category}")
    public ResponseEntity<?> deleteCategory(HttpServletRequest request) {
        Long categoryID = Long.valueOf(request.getParameter(PARAM_CATEGORY_ID));

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_DELETE_NOTFOUND);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        try {
            categoryRepository.delete(category);
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_DELETE_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_DELETE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.admin.upload-category-image}")
    public ResponseEntity<?> uploadCategoryImage(HttpServletRequest request) throws IOException {
        Long categoryID = Long.valueOf(request.getParameter(PARAM_CATEGORY_ID));
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles(PARAM_CATEGORY_IMAGE);

        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);

        if (category == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_IMAGE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = freeImageService.uploadImageToFreeImage(image.getBytes());
            paths.add(url);
        }

        category.setImagePath(paths.get(0));
        categoryRepository.save(category);
        ResponseObject responseObject = new ResponseObject(RESPONSE_CATEGORY_IMAGE_SUCCESS);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("${endpoint.public.get-all-categories}")
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

    @PostMapping("${endpoint.public.category-by-id}")
    public ResponseEntity<?> getCategoryByCategoryID(HttpServletRequest request, @PathVariable Long categoryID) {
        Category category = categoryRepository.findCategoriesByCategoryID(categoryID);
        category.setProducts(getProductsInCategory(categoryID));
        return ResponseEntity.ok(category);
    }

    @GetMapping("${endpoint.public.get-random-8-products}")
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
                    products.add(getProductDetails(productCategory.getProductID()));
                    if (products.size() == MAX_PRODUCT_DISPLAY) {
                        break;
                    }
                }
                subCategory.setProducts(products);
            }
            temp.setSubCategories(subCategoryList);
            categories.add(temp);
        }
        return ResponseEntity.ok(categories);
    }

    public Product getProductDetails(Long productID) {
        Product product = productRepository.findProductByProductID(productID);

        List<ProductImage> productImages = productImageRepository.findProductImageByProductID(productID);
        product.setProductImages(productImages);

        List<ProductSize> productSizes = productSizeRepository.findProductSizeByProductID(productID);
        product.setProductSizes(productSizes);

        List<ProductQuantity> productQuantities = productQuantityRepository.findProductQuantitiesByProductID(productID);
        product.setProductQuantities(productQuantities);

        List<OrderDetails> orderDetails = orderDetailsRepository.findOrderDetailsByProductID(productID);

        Long quantitySold = 0L;
        for (OrderDetails o: orderDetails) {
            quantitySold += o.getQuantity();
        }

        product.setQuantitySold(quantitySold);
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
                    products.add(getProductDetails(productID));
                }
            }
        }
        else {
            List<ProductCategory> productCategoryList = productCategoryRepository.findProductCategoriesByCategoryID(categoryID);
            for (ProductCategory productCategory : productCategoryList) {
                Long productID = productCategory.getProductID();
                products.add(getProductDetails(productID));
            }
        }
        return products;
    }

    @GetMapping("${endpoint.public.search-category}")
    public ResponseEntity<?> searchCategory(HttpServletRequest request) {
        String categoryName = request.getParameter(PARAM_CATEGORY_NAME);
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
