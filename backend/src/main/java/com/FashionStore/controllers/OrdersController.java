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

import java.util.Date;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class OrdersController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CategoryRepository categoryRepository;

    private final OrdersRepository ordersRepository;

    private final OrderDetailsRepository orderDetailsRepository;

    private final UsersRepository usersRepository;

    private final AddressRepository addressRepository;

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final String appRoot = System.getProperty("user.dir") + File.separator;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public OrdersController(ProductRepository productRepository,
                            ProductImageRepository productImageRepository,
                            ProductCategoryRepository productCategoryRepository,
                            ProductSizeRepository productSizeRepository,
                            ProductQuantityRepository productQuantityRepository,
                            CategoryRepository categoryRepository,
                            OrdersRepository ordersRepository,
                            UsersRepository usersRepository,
                            AddressRepository addressRepository,
                            CartRepository cartRepository,
                            OrderDetailsRepository orderDetailsRepository,
                            CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.categoryRepository = categoryRepository;
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.addressRepository = addressRepository;
        this.cartRepository = cartRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @PostMapping("/orders/{orderID}")
    public ResponseEntity<?> getOrdersByOrderID(HttpServletRequest request, @PathVariable Long orderID) {
        Orders orders = getOrderDetails(orderID);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/add-orders-by-cart")
    public ResponseEntity<?> addOrdersByCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        Long addressID = Long.valueOf(request.getParameter("addressID"));
        Long totalAmount = Long.valueOf(request.getParameter("totalAmount"));

        Date orderDate = new Date();
        orderDate.setTime(orderDate.getTime());

        String orderStatus = "Đang chờ xác nhận";

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Users users = findByEmail.get(0);
        Long userID = users.getUserID();

        Address address = addressRepository.findAddressByAddressID(addressID);
        Orders orders = new Orders(orderDate, totalAmount, orderStatus, userID, addressID,
                address.getRecipientName(), address.getRecipientPhone(), address.getAddressDetails());

        ordersRepository.save(orders);

        /*
            Xử lý giỏ hàng
        */

        Cart cart = cartRepository.findCartByUserID(userID);

        if (cart == null) {
            ResponseObject responseObject = new ResponseObject("Giỏ hàng đã trống!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        List<CartItem> cartItems = cartItemRepository.findCartItemByCartID(cart.getCartID());

        if (cartItems.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Giỏ hàng đã trống!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        List<OrderDetails> orderDetailsList = new ArrayList<>();
        for (CartItem cartItem: cartItems) {
            Product product = getProductDetails(cartItem.getProductID());
            ProductSize productSize = productSizeRepository.findProductSizeBySizeID(cartItem.getSizeID());

            // Đặt tên tệp ảnh cần sao chép
            String fileNameToCopy = productImageRepository.findProductImageByProductID(product.getProductID()).get(0).getImagePath();

            // Đường dẫn đến tệp gốc
            String filePathToCopy = appRoot + UPLOAD_DIR + File.separator + fileNameToCopy;


            // Đường dẫn đến tệp mới
            String fileExtension = "";
            if (fileNameToCopy != null) {
                fileExtension = fileNameToCopy.substring(fileNameToCopy.lastIndexOf(".") + 1);
            }
            String imagePath = UUID.randomUUID().toString() + "." + fileExtension;
            String newFilePath = appRoot + UPLOAD_DIR + File.separator + imagePath;

            try {
                // Đọc dữ liệu từ tệp gốc
                byte[] imageData = Files.readAllBytes(Paths.get(filePathToCopy));

                // Ghi dữ liệu vào tệp mới
                Files.write(Paths.get(newFilePath), imageData);
            } catch (IOException e) {
                e.printStackTrace();
            }

            OrderDetails orderDetails = new OrderDetails(orders.getOrderID(), product.getProductID(), product.getProductName(),
                    imagePath, productSize.getSizeName(), product.getProductPrice(), cartItem.getQuantityPurchase(),
                    product.getProductPrice() * cartItem.getQuantityPurchase());
            orderDetailsList.add(orderDetails);
            orderDetailsRepository.save(orderDetails);
            cartItemRepository.delete(cartItem);
        }

        orders.setOrderDetails(orderDetailsList);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/add-orders-by-checkout")
    public ResponseEntity<?> addOrdersByCheckout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        Long addressID = Long.valueOf(request.getParameter("addressID"));
        Long totalAmount = Long.valueOf(request.getParameter("totalAmount"));
        Long productID = Long.valueOf(request.getParameter("productID"));
        Long sizeID = Long.valueOf(request.getParameter("sizeID"));
        Long quantityPurchase = Long.valueOf(request.getParameter("quantityPurchase"));

        Date orderDate = new Date();
        orderDate.setTime(orderDate.getTime());

        String orderStatus = "Đang chờ xác nhận";

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Users users = findByEmail.get(0);
        Long userID = users.getUserID();

        Address address = addressRepository.findAddressByAddressID(addressID);
        Orders orders = new Orders(orderDate, totalAmount, orderStatus, userID, addressID,
                address.getRecipientName(), address.getRecipientPhone(), address.getAddressDetails());

        ordersRepository.save(orders);


        List<OrderDetails> orderDetailsList = new ArrayList<>();
        Product product = getProductDetails(productID);
        ProductSize productSize = productSizeRepository.findProductSizeBySizeID(sizeID);

        // Đặt tên tệp ảnh cần sao chép
        String fileNameToCopy = productImageRepository.findProductImageByProductID(product.getProductID()).get(0).getImagePath();

        // Đường dẫn đến tệp gốc
        String filePathToCopy = appRoot + UPLOAD_DIR + File.separator + fileNameToCopy;


        // Đường dẫn đến tệp mới
        String fileExtension = "";
        if (fileNameToCopy != null) {
            fileExtension = fileNameToCopy.substring(fileNameToCopy.lastIndexOf(".") + 1);
        }
        String imagePath = UUID.randomUUID().toString() + "." + fileExtension;
        String newFilePath = appRoot + UPLOAD_DIR + File.separator + imagePath;

        try {
            // Đọc dữ liệu từ tệp gốc
            byte[] imageData = Files.readAllBytes(Paths.get(filePathToCopy));

            // Ghi dữ liệu vào tệp mới
            Files.write(Paths.get(newFilePath), imageData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        OrderDetails orderDetails = new OrderDetails(orders.getOrderID(), product.getProductID(),
                product.getProductName(),
                imagePath, productSize.getSizeName(), product.getProductPrice(), quantityPurchase,
                product.getProductPrice() * quantityPurchase);
        orderDetailsList.add(orderDetails);
        orderDetailsRepository.save(orderDetails);

        orders.setOrderDetails(orderDetailsList);
        return ResponseEntity.ok(orders);
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

    public Orders getOrderDetails(Long orderID) {
        Orders orders = ordersRepository.findOrdersByOrderID(orderID);
        orders.setOrderDetails(orderDetailsRepository.findOrderDetailsByOrderID(orderID));
        return orders;
    }
}

