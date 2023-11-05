package com.FashionStore.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Long categoryID;

    @Column(name = "CategoryName")
    private String categoryName;

    @Column(name = "ParentCategoryID")
    private Long parentCategoryID;

    @Transient
    private List<Product> products;

    @Transient
    private List<Category> subCategories;

    public Category() {

    }

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category(String categoryName, Long parentCategoryID) {
        this.categoryName = categoryName;
        this.parentCategoryID = parentCategoryID;
    }

    public Category(Long categoryID, String categoryName, Long parentCategoryID) {
        this.categoryID = categoryID;
        this.categoryName = categoryName;
        this.parentCategoryID = parentCategoryID;
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

    @Override
    public String toString() {
        return "Category{" +
                "categoryID=" + categoryID +
                ", categoryName='" + categoryName + '\'' +
                ", parentCategoryID=" + parentCategoryID +
                ", products=" + products +
                '}';
    }
}