package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ProductQuantity")
public class ProductQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QuantityID")
    private Long quantityID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "SizeID")
    private Long sizeID;

    @Column(name = "Quantity")
    private Long quantity;

    public ProductQuantity(Long productID, Long sizeID, Long quantity) {
        this.productID = productID;
        this.sizeID = sizeID;
        this.quantity = quantity;
    }

    public Long getQuantityID() {
        return quantityID;
    }

    public void setQuantityID(Long quantityID) {
        this.quantityID = quantityID;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Long getSizeID() {
        return sizeID;
    }

    public void setSizeID(Long sizeID) {
        this.sizeID = sizeID;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "ProductQuantity{" +
                "quantityID=" + quantityID +
                ", productID=" + productID +
                ", sizeID=" + sizeID +
                ", quantity=" + quantity +
                '}';
    }
}
