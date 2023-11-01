package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "CartItem")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CartItemID")
    private Long cartItemID;

    @Column(name = "CartID")
    private Long cartID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "SizeID")
    private Long sizeID;

    @Column(name = "Quantity")
    private Long quantity;

    public CartItem() {
    }

    public CartItem(Long cartID, Long productID, Long sizeID, Long quantity) {
        this.cartID = cartID;
        this.productID = productID;
        this.sizeID = sizeID;
        this.quantity = quantity;
    }

    public Long getCartItemID() {
        return cartItemID;
    }

    public void setCartItemID(Long cartItemID) {
        this.cartItemID = cartItemID;
    }

    public Long getCartID() {
        return cartID;
    }

    public void setCartID(Long cartID) {
        this.cartID = cartID;
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
}
