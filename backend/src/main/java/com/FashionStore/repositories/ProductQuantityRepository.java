package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {

}
