package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {
    List<ProductQuantity> findProductQuantitiesByProductID(Long productID);
    ProductQuantity findProductQuantitiesByProductIDAndSizeID(Long productID, Long sizeID);
}
