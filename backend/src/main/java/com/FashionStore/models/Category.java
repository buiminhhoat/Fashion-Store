package com.FashionStore.models;

import jakarta.persistence.*;

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

    public Category() {

    }

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category(String categoryName, Long parentCategoryID) {
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

    @Override
    public String toString() {
        return "Category{" +
                "categoryID=" + categoryID +
                ", categoryName='" + categoryName + '\'' +
                ", parentCategoryID=" + parentCategoryID +
                '}';
    }
}