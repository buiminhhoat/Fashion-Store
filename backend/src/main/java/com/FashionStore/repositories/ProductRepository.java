package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductByProductID(Long productID);
    List<Product> findProductByProductName(String productName);

    List<Product> findProductsByProductNameIsContaining(String productName);
}
