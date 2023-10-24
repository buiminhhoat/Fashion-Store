package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByProductName(String productName);
}
