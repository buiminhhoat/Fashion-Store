package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "productcategory")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductCategoryID")
    private Long productCategoryID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "CategoryID")
    private Long categoryID;

    public ProductCategory() {
    }

    public ProductCategory(Long productID, Long categoryID) {
        this.productID = productID;
        this.categoryID = categoryID;
    }

    public Long getProductCategoryID() {
        return productCategoryID;
    }

    public void setProductCategoryID(Long productCategoryID) {
        this.productCategoryID = productCategoryID;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Long getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    @Override
    public String toString() {
        return "ProductCategory{" +
                "productCategoryID=" + productCategoryID +
                ", productID=" + productID +
                ", categoryID=" + categoryID +
                '}';
    }
}