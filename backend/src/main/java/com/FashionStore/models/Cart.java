package com.FashionStore.models;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CartID")
    private Long cartID;

    @Column(name = "UserID")
    private Long userID;

    @Column(name = "CreatedAt")
    private Date createdAt;

    public Cart() {
    }

    public Cart(Long userID, Date createdAt) {
        this.userID = userID;
        this.createdAt = createdAt;
    }

    public Long getCartID() {
        return cartID;
    }

    public void setCartID(Long cartID) {
        this.cartID = cartID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartID=" + cartID +
                ", userID=" + userID +
                ", createdAt=" + createdAt +
                '}';
    }
}
