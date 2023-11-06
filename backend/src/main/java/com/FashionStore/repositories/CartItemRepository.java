package com.FashionStore.repositories;

import com.FashionStore.models.Cart;
import com.FashionStore.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findCartItemByCartID(Long cardID);

    CartItem findCartItemByCartIDAndProductIDAndSizeID(Long cartID, Long productID, Long sizeID);
    CartItem findCartItemByCartItemID(Long cardItemID);
}
