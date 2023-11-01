package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ProductSize")
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SizeID")
    private Long sizeID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "SizeName")
    private String sizeName;

    public ProductSize() {
    }

    public ProductSize(Long productID, String sizeName) {
        this.productID = productID;
        this.sizeName = sizeName;
    }

    public Long getSizeID() {
        return sizeID;
    }

    public void setSizeID(Long sizeID) {
        this.sizeID = sizeID;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    @Override
    public String toString() {
        return "ProductSize{" +
                "sizeID=" + sizeID +
                ", productID=" + productID +
                ", sizeName='" + sizeName + '\'' +
                '}';
    }
}
