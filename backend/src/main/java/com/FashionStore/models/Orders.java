package com.FashionStore.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    private Long orderID;

    @Column(name = "OrderDate")
    private Date orderDate;

    @Column(name = "TotalAmount")
    private Long totalAmount;

    @Column(name = "OrderStatus")
    private String orderStatus;

    @Column(name = "UserID")
    private Long userID;

    @Column(name = "RecipientName")
    private String recipientName;

    @Column(name = "RecipientPhone")
    private String recipientPhone;

    @Column(name = "AddressDetails")
    private String addressDetails;

    @Transient
    private List<OrderDetails> orderDetails;

    @Transient
    private String fullName;

    @Transient
    private String avatarPath;

    public Orders() {

    }

    public Orders(Date orderDate, Long totalAmount,
                  String orderStatus, Long userID,
                  String recipientName, String recipientPhone, 
                  String addressDetails) {
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.userID = userID;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.addressDetails = addressDetails;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientPhone() {
        return recipientPhone;
    }

    public void setRecipientPhone(String recipientPhone) {
        this.recipientPhone = recipientPhone;
    }

    public String getAddressDetails() {
        return addressDetails;
    }

    public void setAddressDetails(String addressDetails) {
        this.addressDetails = addressDetails;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }
}
