package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductImage;
import com.FashionStore.models.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
    List<ProductSize> findProductSizeByProductID(Long productID);
}
