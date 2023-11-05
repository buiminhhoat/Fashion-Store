package com.FashionStore.repositories;

import com.FashionStore.models.Category;
import com.FashionStore.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoriesByCategoryID(Long categoryID);
    List<Category> findCategoriesByCategoryName(String categoryName);
    List<Category> findCategoriesByCategoryNameContaining(String categoryName);
    List<Category> findCategoriesByParentCategoryID(Long parentCategoryID);

    List<Category> findCategoriesByParentCategoryIDAndCategoryNameContaining(Long parentCategoryID, String categoryName);
}
