package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cartitem")
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

    @Column(name = "QuantityPurchase")
    private Long quantityPurchase;

    @Transient
    Product product;

    public CartItem() {
    }

    public CartItem(Long cartID, Long productID, Long sizeID, Long quantityPurchase) {
        this.cartID = cartID;
        this.productID = productID;
        this.sizeID = sizeID;
        this.quantityPurchase = quantityPurchase;
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

    public Long getQuantityPurchase() {
        return quantityPurchase;
    }

    public void setQuantityPurchase(Long quantityPurchase) {
        this.quantityPurchase = quantityPurchase;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
