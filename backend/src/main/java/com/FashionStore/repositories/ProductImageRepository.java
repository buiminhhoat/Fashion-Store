package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findProductImageByProductID(Long productID);
}
