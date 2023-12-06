package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "productimage")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ImageID")
    private Long imageID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "ImagePath")
    private String imagePath;

    public ProductImage() {
    }

    public ProductImage(Long productID, String imagePath) {
        this.productID = productID;
        this.imagePath = imagePath;
    }

    public Long getImageID() {
        return imageID;
    }

    public void setImageID(Long imageID) {
        this.imageID = imageID;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
