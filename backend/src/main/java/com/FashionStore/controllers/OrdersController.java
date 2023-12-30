package com.FashionStore.controllers;

import com.FashionStore.models.*;
import com.FashionStore.repositories.*;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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

    private final String ORDER_STATUS_PENDING;

    private final String ORDER_STATUS_CANCELLED;

    private final String RESPONSE_TOKEN_INVALID;

    private final String RESPONSE_CART_EMPTY;

    private final String ORDER_STATUS_ALL;

    @Value("${order.param.orderID}")
    private String ORDER_PARAM_ORDER_ID;

    @Value("${order.param.addressID}")
    private String ORDER_PARAM_ADDRESS_ID;

    @Value("${order.param.totalAmount}")
    private String ORDER_PARAM_TOTAL_AMOUNT;

    @Value("${order.param.productID}")
    private String ORDER_PARAM_PRODUCT_ID;

    @Value("${order.param.sizeID}")
    private String ORDER_PARAM_SIZE_ID;

    @Value("${order.param.quantityPurchase}")
    private String ORDER_PARAM_QUANTITY_PURCHASE;

    @Value("${order.param.orderStatus}")
    private String ORDER_PARAM_ORDER_STATUS;

    @Value("${order.param.userID}")
    private String ORDER_PARAM_USER_ID;

    @Value("${header.authorization}")
    private String HEADER_AUTHORIZATION;

    @Value("${authorization.bearer}")
    private String AUTHORIZATION_BEARER;


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
                            CartItemRepository cartItemRepository, MessageSource messageSource) {
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

        this.ORDER_STATUS_PENDING = messageSource.getMessage("order.status.pending", null, LocaleContextHolder.getLocale());
        this.ORDER_STATUS_CANCELLED = messageSource.getMessage("order.status.cancelled", null, LocaleContextHolder.getLocale());
        this.RESPONSE_TOKEN_INVALID = messageSource.getMessage("response.token.invalid", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_EMPTY = messageSource.getMessage("response.cart.empty", null, LocaleContextHolder.getLocale());
        this.ORDER_STATUS_ALL = messageSource.getMessage("order.status.all", null, LocaleContextHolder.getLocale());
    }

    @PostMapping("${mapping.public.orders}")
    public ResponseEntity<?> getOrdersByOrderID(HttpServletRequest request) {
        Long orderID = Long.valueOf(request.getParameter(ORDER_PARAM_ORDER_ID));
        Orders orders = getOrderDetails(orderID);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("${mapping.public.add-orders-by-cart}")
    public ResponseEntity<?> addOrdersByCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        Long addressID = Long.valueOf(request.getParameter(ORDER_PARAM_ADDRESS_ID));
        Long totalAmount = Long.valueOf(request.getParameter(ORDER_PARAM_TOTAL_AMOUNT));

        Date orderDate = new Date();
        orderDate.setTime(orderDate.getTime());

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Users users = findByEmail;
        Long userID = users.getUserID();

        Address address = addressRepository.findAddressByAddressID(addressID);
        Orders orders = new Orders(orderDate, totalAmount, ORDER_STATUS_PENDING, userID, addressID,
                address.getRecipientName(), address.getRecipientPhone(), address.getAddressDetails());

        ordersRepository.save(orders);

        // Xử lý giỏ hàng
        Cart cart = cartRepository.findCartByUserID(userID);

        if (cart == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CART_EMPTY);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        List<CartItem> cartItems = cartItemRepository.findCartItemByCartID(cart.getCartID());

        if (cartItems.isEmpty()) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CART_EMPTY);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        List<OrderDetails> orderDetailsList = new ArrayList<>();
        for (CartItem cartItem: cartItems) {
            Product product = getProductDetails(cartItem.getProductID());
            ProductSize productSize = productSizeRepository.findProductSizeBySizeID(cartItem.getSizeID());

            String imagePath = productImageRepository.findProductImageByProductID(product.getProductID()).getFirst().getImagePath();

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

    @PostMapping("${mapping.public.add-orders-by-checkout}")
    public ResponseEntity<?> addOrdersByCheckout(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        Long addressID = Long.valueOf(request.getParameter(ORDER_PARAM_ADDRESS_ID));
        Long totalAmount = Long.valueOf(request.getParameter(ORDER_PARAM_TOTAL_AMOUNT));
        Long productID = Long.valueOf(request.getParameter(ORDER_PARAM_PRODUCT_ID));
        Long sizeID = Long.valueOf(request.getParameter(ORDER_PARAM_SIZE_ID));
        Long quantityPurchase = Long.valueOf(request.getParameter(ORDER_PARAM_QUANTITY_PURCHASE));

        Date orderDate = new Date();
        orderDate.setTime(orderDate.getTime());

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Users users = findByEmail;
        Long userID = users.getUserID();

        Address address = addressRepository.findAddressByAddressID(addressID);
        Orders orders = new Orders(orderDate, totalAmount, ORDER_STATUS_PENDING, userID, addressID,
                address.getRecipientName(), address.getRecipientPhone(), address.getAddressDetails());

        ordersRepository.save(orders);

        List<OrderDetails> orderDetailsList = new ArrayList<>();
        Product product = getProductDetails(productID);
        ProductSize productSize = productSizeRepository.findProductSizeBySizeID(sizeID);

        String imagePath = productImageRepository.findProductImageByProductID(product.getProductID()).get(0).getImagePath();

        OrderDetails orderDetails = new OrderDetails(orders.getOrderID(), product.getProductID(),
                product.getProductName(),
                imagePath, productSize.getSizeName(), product.getProductPrice(), quantityPurchase,
                product.getProductPrice() * quantityPurchase);
        orderDetailsList.add(orderDetails);
        orderDetailsRepository.save(orderDetails);

        orders.setOrderDetails(orderDetailsList);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("${mapping.public.orders.get-all-orders-by-order-status}")
    public ResponseEntity<?> getAllOrdersByStatus(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");

        List<Orders> allOrdersByOrderStatus = new ArrayList<>();

        String orderStatus = request.getParameter(ORDER_PARAM_ORDER_STATUS);

        Long userID = Long.valueOf(request.getParameter(ORDER_PARAM_USER_ID));

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users usersByEmail = usersRepository.findUsersByEmail(email);
        if (usersByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAdmin = usersByEmail.getIsAdmin();
        if (!isAdmin && !Objects.equals(usersByEmail.getUserID(), userID)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        else {
            if (Objects.equals(orderStatus, ORDER_STATUS_ALL)) {
                allOrdersByOrderStatus = ordersRepository.findOrdersByUserID(userID);
            } else {
                allOrdersByOrderStatus = ordersRepository.findOrdersByUserIDAndOrderStatus(userID, orderStatus);
            }

            List<Orders> orders = new ArrayList<>();
            for (Orders o : allOrdersByOrderStatus) {
                orders.add(getOrderDetails(o.getOrderID()));
            }
            return ResponseEntity.ok(orders);
        }
    }

    @PostMapping("${mapping.public.orders.cancel-order}")
    public ResponseEntity<?> cancelOrder(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");

        Long orderID = Long.valueOf(request.getParameter(ORDER_PARAM_ORDER_ID));

        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        String email = jwtTokenUtil.getSubjectFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Orders orders = getOrderDetails(orderID);
        orders.setOrderStatus(ORDER_STATUS_CANCELLED);
        ordersRepository.save(orders);

        return ResponseEntity.ok(orders);
    }

    /* Admin */
    @PostMapping("${mapping.admin.orders.set-order-status}")
    public ResponseEntity<?> setOrderStatus(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");

        Long orderID = Long.valueOf(request.getParameter(ORDER_PARAM_ORDER_ID));
        String orderStatus = request.getParameter(ORDER_PARAM_ORDER_STATUS);

        Orders orders = getOrderDetails(orderID);
        orders.setOrderStatus(orderStatus);
        ordersRepository.save(orders);

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

        Category parentCategory = categoryRepository.findCategoriesByCategoryID(category.getParentCategoryID());
        product.setParentCategory(parentCategory);
        return product;
    }

    public Orders getOrderDetails(Long orderID) {
        Orders orders = ordersRepository.findOrdersByOrderID(orderID);
        orders.setOrderDetails(orderDetailsRepository.findOrderDetailsByOrderID(orderID));
        return orders;
    }
}
