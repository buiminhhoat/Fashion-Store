package com.FashionStore.repositories;

import com.FashionStore.models.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Long> {
    List<Products> findProductsByProductName(String productName);
}
