package com.FashionStore.models;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    private String productName;

    private Double productPrice;

    private Double productDiscountPrice;

    private String description;

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public Double getProductDiscountPrice() {
        return productDiscountPrice;
    }

    public void setProductDiscountPrice(Double productDiscountPrice) {
        this.productDiscountPrice = productDiscountPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Products{" +
                "productID=" + productID +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productDiscountPrice=" + productDiscountPrice +
                ", description='" + description + '\'' +
                '}';
    }
}
