package com.FashionStore.models;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Long categoryID;

    @Column(name = "CategoryName")
    private String categoryName;

    @Column(name = "ParentCategoryID")
    private Long parentCategoryID;

    @Column(name = "ImagePath")
    private String imagePath;

    @Transient
    private List<Product> products;

    @Transient
    private List<Category> subCategories;

    public Category() {

    }

    public Category(String categoryName, String imagePath) {
        this.categoryName = categoryName;
        this.imagePath = imagePath;
    }

    public Category(String categoryName, Long parentCategoryID, String imagePath) {
        this.categoryName = categoryName;
        this.parentCategoryID = parentCategoryID;
        this.imagePath = imagePath;
    }

    public Category(Long categoryID, String categoryName, Long parentCategoryID, String imagePath) {
        this.categoryID = categoryID;
        this.categoryName = categoryName;
        this.parentCategoryID = parentCategoryID;
        this.imagePath = imagePath;
    }

    public Long getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getParentCategoryID() {
        return parentCategoryID;
    }

    public void setParentCategoryID(Long parentCategoryID) {
        this.parentCategoryID = parentCategoryID;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public List<Category> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<Category> subCategories) {
        this.subCategories = subCategories;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryID=" + categoryID +
                ", categoryName='" + categoryName + '\'' +
                ", parentCategoryID=" + parentCategoryID +
                ", imagePath='" + imagePath + '\'' +
                ", products=" + products +
                ", subCategories=" + subCategories +
                '}';
    }
}