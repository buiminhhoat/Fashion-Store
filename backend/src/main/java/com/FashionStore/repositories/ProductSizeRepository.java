package com.FashionStore.repositories;

import com.FashionStore.models.Product;
import com.FashionStore.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSizeRepository extends JpaRepository<Product, Long> {

}
