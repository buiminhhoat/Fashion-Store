package com.FashionStore.models;

public class ProductSizeQuantity {
    private String sizeName;
    private Long quantity;

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public ProductSizeQuantity() {

    }

    public ProductSizeQuantity(String sizeName) {
        this.sizeName = sizeName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}
