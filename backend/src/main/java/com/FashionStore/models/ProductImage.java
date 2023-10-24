package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ProductImage")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ImageID")
    private Long imageID;

    @Column(name = "ProductID")
    private Long productID;

    @Column(name = "ImagePath")
    private String imagePath;


}
