package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Banner")
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BannerID")
    private Long bannerID;

    @Column(name = "DisplayOrder")
    private int displayOrder;

    @Column(name = "ImagePath")
    private String imagePath;

    @Column(name = "BannerLinkTo")
    private String bannerLinkTo;

    public Banner() {

    }

    public Banner(int displayOrder, String imagePath, String bannerLinkTo) {
        this.displayOrder = displayOrder;
        this.imagePath = imagePath;
        this.bannerLinkTo = bannerLinkTo;
    }

    public Long getBannerID() {
        return bannerID;
    }

    public void setBannerID(Long bannerID) {
        this.bannerID = bannerID;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getBannerLinkTo() {
        return bannerLinkTo;
    }

    public void setBannerLinkTo(String bannerLinkTo) {
        this.bannerLinkTo = bannerLinkTo;
    }
}
