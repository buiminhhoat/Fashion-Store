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

    private final CategoryRepository categoryRepository;


    @Value("${upload_image.dir}")
    String UPLOAD_DIR;

    @Autowired
    public CartController(ProductRepository productRepository, ProductImageRepository productImageRepository,
                          ProductCategoryRepository productCategoryRepository,
                          ProductSizeRepository productSizeRepository,
                          ProductQuantityRepository productQuantityRepository,
                          CartRepository cartRepository,
                          CartItemRepository cartItemRepository,
                          UsersRepository usersRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.usersRepository = usersRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/public/get-cart")
    public ResponseEntity<?> getCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.get(0).getUserID();

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
                "Đã lấy thông tin giỏ hàng thành công",
                cart);
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

        Category parentCategory = categoryRepository.findCategoriesByCategoryID(productCategory.getParentCategoryID());
        product.setParentCategory(parentCategory);
        return product;
    }

    @PostMapping("/public/add-product-to-cart")
    public ResponseEntity<?> addProductToCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
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
        CartItem cartItem = cartItemRepository.findCartItemByCartIDAndProductIDAndSizeID(cartID, productID, sizeID);

        if (cartItem == null) {
            cartItem = new CartItem(cartID, productID, sizeID, quantityPurchase);
            cartItemRepository.save(cartItem);
        } else {
            Long limitQuantity = productQuantityRepository.findProductQuantitiesByProductIDAndSizeID(productID, sizeID).getQuantity();
            Long oldCartItemQuantity = cartItem.getQuantityPurchase();
            if (oldCartItemQuantity + quantityPurchase > limitQuantity) {
                ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "Trong kho chỉ còn lại " + limitQuantity + " sản phẩm", null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
            }
            cartItem.setQuantityPurchase(oldCartItemQuantity + quantityPurchase);
            cartItemRepository.save(cartItem);
        }

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(), "Đã thêm sản phẩm vào giỏ", cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("/public/edit-product-in-cart")
    public ResponseEntity<?> editProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.get(0).getUserID();
        Long cartItemID = Long.valueOf(request.getParameter("cartItemID"));
        Long productID = Long.valueOf(request.getParameter("productID"));
        Long sizeID = Long.valueOf(request.getParameter("sizeID"));
        Long quantityPurchase = Long.valueOf(request.getParameter("quantityPurchase"));

        CartItem cartItem = cartItemRepository.findCartItemByCartItemID(cartItemID);

        Long limitQuantity = productQuantityRepository.findProductQuantitiesByProductIDAndSizeID(productID, sizeID).getQuantity();
        if (quantityPurchase > limitQuantity) {
            ResponseObject responseObject = new ResponseObject(HttpStatus.UNAUTHORIZED.toString(), "Trong kho chỉ còn lại " + limitQuantity + " sản phẩm", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        if (cartItem == null) {
            ResponseObject responseObject = new ResponseObject("Cart Item ID không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        cartItem.setProductID(productID);
        cartItem.setSizeID(sizeID);
        cartItem.setQuantityPurchase(quantityPurchase);

        cartItemRepository.save(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                "Chỉnh sửa sản phẩm trong giỏ hàng thành công", cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("/public/delete-product-in-cart")
    public ResponseEntity<?> deleteProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);

        Long cartItemID = Long.valueOf(request.getParameter("cartItemID"));

        CartItem cartItem = cartItemRepository.findCartItemByCartItemID(cartItemID);

        if (cartItem == null) {
            ResponseObject responseObject = new ResponseObject("Cart Item ID không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        cartItemRepository.delete(cartItem);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                "Xóa sản phẩm trong giỏ hàng thành công", cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("/public/delete-all-product-in-cart")
    public ResponseEntity<?> deleteAllProductInCart(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ, vui lòng đăng nhập lại");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);

        Long userID = findByEmail.get(0).getUserID();

        Cart cart = new Cart(userID);

        if (cartRepository.findCartByUserID(userID) == null) {
            cartRepository.save(cart);
        }

        cart = cartRepository.findCartByUserID(userID);

        Long cartID = cart.getCartID();

        List<CartItem> cartItems = cartItemRepository.findCartItemByCartID(cartID);

        cartItemRepository.deleteAll(cartItems);

        ResponseObject responseObject = new ResponseObject(HttpStatus.OK.toString(),
                "Xóa tất cả các sản phẩm trong giỏ hàng thành công", null);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }
}

