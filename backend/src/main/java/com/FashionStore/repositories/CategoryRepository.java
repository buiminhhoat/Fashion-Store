package com.FashionStore.repositories;

import com.FashionStore.models.Category;
import com.FashionStore.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByCategoryID(Long categoryID);
    List<Category> findCategoriesByCategoryName(String categoryName);
    List<Category> findCategoriesByParentCategoryID(Long parentCategoryID);
}
