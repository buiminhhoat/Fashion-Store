package com.FashionStore.repositories;

import com.FashionStore.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findProductCategoriesByProductCategoryID(Long productCategoryID);
}
