package com.FashionStore.repositories;

import com.FashionStore.models.Address;
import com.FashionStore.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByCategoryID(Long categoryID);
}
