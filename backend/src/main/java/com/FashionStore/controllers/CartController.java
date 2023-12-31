package com.FashionStore.controllers;

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

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class CartController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private ProductQuantityRepository productQuantityRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${header.authorization}")
    private String HEADER_AUTHORIZATION;

    @Value("${authorization.bearer}")
    private String AUTHORIZATION_BEARER;

    @Value("${param.productID}")
    private String PARAM_PRODUCT_ID;

    @Value("${param.sizeID}")
    private String PARAM_SIZE_ID;

    @Value("${param.quantityPurchase}")
    private String PARAM_QUANTITY_PURCHASE;

    @Value("${param.cartItemID}")
    private String PARAM_CART_ITEM_ID;

    private final String RESPONSE_TOKEN_INVALID;

    private final String RESPONSE_UNAUTHORIZED;

    private final String RESPONSE_CART_ITEM_INVALID;

    private final String RESPONSE_CART_DELETE_SUCCESS;

    private final String RESPONSE_CART_EDIT_SUCCESS;

    private final String RESPONSE_CART_ADD_SUCCESS;
    private final String RESPONSE_CART_QUANTITY_LIMIT;
    private final String RESPONSE_CART_PRODUCT;

    private final String RESPONSE_QUANTITY_IN_USER_CART;


    @Autowired
    public CartController(MessageSource messageSource) {
        this.RESPONSE_TOKEN_INVALID = messageSource.getMessage("response.token.invalid", null, LocaleContextHolder.getLocale());
        this.RESPONSE_UNAUTHORIZED = messageSource.getMessage("response.unauthorized", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_ITEM_INVALID = messageSource.getMessage("response.cartItem.invalid", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_DELETE_SUCCESS = messageSource.getMessage("response.cart.delete.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_EDIT_SUCCESS = messageSource.getMessage("response.cart.edit.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_ADD_SUCCESS = messageSource.getMessage("response.cart.add.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_QUANTITY_LIMIT = messageSource.getMessage("response.cart.quantity.limit", null, LocaleContextHolder.getLocale());
        this.RESPONSE_CART_PRODUCT = messageSource.getMessage("response.cart.product", null, LocaleContextHolder.getLocale());
        this.RESPONSE_QUANTITY_IN_USER_CART = messageSource.getMessage("response.quantity.in.user.cart", null, LocaleContextHolder.getLocale());
    }
    @GetMapping("${endpoint.public.get-cart}")
    public ResponseEntity<?> getCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.getUserID();

        Cart cart = new Cart(userID);

        if (cartRepository.findCartByUserID(userID) == null) {
            cartRepository.save(cart);
        }

        cart = cartRepository.findCartByUserID(userID);

        Long cartID = cart.getCartID();
        cart.setCartItems(cartItemRepository.findCartItemByCartID(cartID));

        for (CartItem cartItem: cart.getCartItems()) {
            cartItem.setProduct(getProductDetails(cartItem.getProductID()));
        }
        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                RESPONSE_CART_EDIT_SUCCESS,
                cart);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("${endpoint.public.add-product-to-cart}")
    public ResponseEntity<?> addProductToCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), RESPONSE_UNAUTHORIZED, null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.getUserID();
        Long productID = Long.valueOf(request.getParameter(PARAM_PRODUCT_ID));
        Long sizeID = Long.valueOf(request.getParameter(PARAM_SIZE_ID));
        Long quantityPurchase = Long.valueOf(request.getParameter(PARAM_QUANTITY_PURCHASE));


        Cart cart = new Cart(userID);

        if (cartRepository.findCartByUserID(userID) == null) {
            cartRepository.save(cart);
        }

        cart = cartRepository.findCartByUserID(userID);

        Long cartID = cart.getCartID();
        CartItem cartItem = cartItemRepository.findCartItemByCartIDAndProductIDAndSizeID(cartID, productID, sizeID);

        if (cartItem == null) {
            cartItem = new CartItem(cartID, productID, sizeID, quantityPurchase);
        } else {
            Long limitQuantity = productQuantityRepository.findProductQuantitiesByProductIDAndSizeID(productID, sizeID).getQuantity();
            Long oldCartItemQuantity = cartItem.getQuantityPurchase();
            if (Objects.equals(oldCartItemQuantity, limitQuantity)) {
                ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), RESPONSE_QUANTITY_IN_USER_CART, null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
            }
            if (oldCartItemQuantity + quantityPurchase > limitQuantity) {
                ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), RESPONSE_CART_QUANTITY_LIMIT + " " + limitQuantity + " " + RESPONSE_CART_PRODUCT, null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
            }
            cartItem.setQuantityPurchase(oldCartItemQuantity + quantityPurchase);
        }
        cartItemRepository.save(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(), RESPONSE_CART_ADD_SUCCESS, cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("${endpoint.public.edit-product-in-cart}")
    public ResponseEntity<?> editProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.getUserID();
        Long cartItemID = Long.valueOf(request.getParameter(PARAM_CART_ITEM_ID));
        Long productID = Long.valueOf(request.getParameter(PARAM_PRODUCT_ID));
        Long sizeID = Long.valueOf(request.getParameter(PARAM_SIZE_ID));
        Long quantityPurchase = Long.valueOf(request.getParameter(PARAM_QUANTITY_PURCHASE));

        CartItem cartItem = cartItemRepository.findCartItemByCartItemID(cartItemID);

        Long limitQuantity = productQuantityRepository.findProductQuantitiesByProductIDAndSizeID(productID, sizeID).getQuantity();
        if (quantityPurchase > limitQuantity) {
            ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), RESPONSE_CART_QUANTITY_LIMIT + " " + limitQuantity + " " + RESPONSE_CART_PRODUCT, null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        if (cartItem == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CART_ITEM_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        cartItem.setProductID(productID);
        cartItem.setSizeID(sizeID);
        cartItem.setQuantityPurchase(quantityPurchase);

        cartItemRepository.save(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                RESPONSE_CART_EDIT_SUCCESS, cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("${endpoint.public.delete-product-in-cart}")
    public ResponseEntity<?> deleteProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        Long cartItemID = Long.valueOf(request.getParameter(PARAM_CART_ITEM_ID));

        CartItem cartItem = cartItemRepository.findCartItemByCartItemID(cartItemID);

        if (cartItem == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_CART_ITEM_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        cartItemRepository.delete(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                RESPONSE_CART_DELETE_SUCCESS, cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("${endpoint.public.delete-all-product-in-cart}")
    public ResponseEntity<?> deleteAllProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_AUTHORIZATION);
        accessToken = accessToken.replace(AUTHORIZATION_BEARER, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.getUserID();

        Cart cart = new Cart(userID);

        if (cartRepository.findCartByUserID(userID) == null) {
            cartRepository.save(cart);
        }

        cart = cartRepository.findCartByUserID(userID);

        Long cartID = cart.getCartID();

        List<CartItem> cartItems = cartItemRepository.findCartItemByCartID(cartID);

        cartItemRepository.deleteAll(cartItems);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                RESPONSE_CART_DELETE_SUCCESS, null);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
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
}
