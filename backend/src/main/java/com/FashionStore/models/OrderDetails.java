package com.FashionStore.models;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "orderdetails")
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderDetailID")
    private Long orderDetailID;

    @Column(name = "OrderID", nullable = false)
    private Long orderID;

    @Column(name = "ProductID", nullable = false)
    private Long productID;

    @Column(name = "ProductName", nullable = false)
    private String productName;

    @Column(name = "ImagePath")
    private String imagePath;

    @Column(name = "SizeID", nullable = false)
    private Long sizeID;

    @Column(name = "ProductPrice", nullable = false)
    private Long productPrice;

    @Column(name = "Quantity", nullable = false)
    private Long quantity;

    @Column(name = "TotalPrice", nullable = false)
    private Long totalPrice;

    @Transient
    private String sizeName;

    public OrderDetails() {

    }

    public OrderDetails(Long orderID, Long productID, String productName,
                        String imagePath, Long sizeID, String sizeName, Long productPrice, Long quantity, Long totalPrice) {
        this.orderID = orderID;
        this.productID = productID;
        this.productName = productName;
        this.imagePath = imagePath;
        this.sizeID = sizeID;
        this.sizeName = sizeName;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Long getOrderDetailID() {
        return orderDetailID;
    }

    public void setOrderDetailID(Long orderDetailID) {
        this.orderDetailID = orderDetailID;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

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

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Long productPrice) {
        this.productPrice = productPrice;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getSizeID() {
        return sizeID;
    }

    public void setSizeID(Long sizeID) {
        this.sizeID = sizeID;
    }
}
