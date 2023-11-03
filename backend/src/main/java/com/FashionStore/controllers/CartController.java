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

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductCategoryRepository productCategoryRepository;

    private final ProductSizeRepository productSizeRepository;

    private final ProductQuantityRepository productQuantityRepository;

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final UsersRepository usersRepository;

    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public CartController(ProductRepository productRepository, ProductImageRepository productImageRepository,
                          ProductCategoryRepository productCategoryRepository,
                          ProductSizeRepository productSizeRepository,
                          ProductQuantityRepository productQuantityRepository,
                          CartRepository cartRepository,
                          CartItemRepository cartItemRepository,
                          UsersRepository usersRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.usersRepository = usersRepository;
    }

    @PostMapping("/add-product-to-cart")
    public ResponseEntity<?> addProductToCart(HttpServletRequest request) {
        String accessToken = String.valueOf(request.getParameter("accessToken"));
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.get(0).getUserID();
        Long productID = Long.valueOf(request.getParameter("productID"));
        Long sizeID = Long.valueOf(request.getParameter("sizeID"));
        Long quantityPurchase = Long.valueOf(request.getParameter("quantityPurchase"));


        Cart cart = new Cart(userID);

        if (cartRepository.findCartByUserID(userID) == null) {
            cartRepository.save(cart);
        }

        cart = cartRepository.findCartByUserID(userID);

        Long cartID = cart.getCartID();
        CartItem cartItem = new CartItem(cartID, productID, sizeID, quantityPurchase);

        CartItem oldCartItem = cartItemRepository.findCartItemByCartIDAndProductID(cartID, productID);

        if (oldCartItem != null && Objects.equals(cartItem.getCartID(), oldCartItem.getCartID())
            && Objects.equals(cartItem.getProductID(), oldCartItem.getProductID())) {
            if (Objects.equals(cartItem.getSizeID(), oldCartItem.getSizeID())) {
                Long oldCartItemQuantity = oldCartItem.getQuantityPurchase();
                cartItemRepository.delete(oldCartItem);
                cartItem.setQuantityPurchase(oldCartItemQuantity + cartItem.getQuantityPurchase());
            }
        }

        cartItemRepository.save(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(), "Đã thêm sản phẩm vào giỏ", cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }
}

