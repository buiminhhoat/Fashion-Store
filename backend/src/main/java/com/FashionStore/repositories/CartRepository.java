package com.FashionStore.repositories;

import com.FashionStore.models.Cart;
import com.FashionStore.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartByUserID(Long userID);
}
