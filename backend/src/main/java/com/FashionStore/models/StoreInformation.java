package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "storeinformation")
public class StoreInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StoreInformationID")
    private Long storeInformationID;

    @Column(name = "Address")
    private String address;

    @Column(name = "Hotline")
    private String hotline;

    @Column(name = "Email")
    private String email;

    @Column(name = "OpeningHours")
    private String openingHours;

    @Column(name = "ClosingHours")
    private String closingHours;

    @Column(name = "Facebook")
    private String facebook;

    public StoreInformation() {
    }

    public Long getStoreInformationID() {
        return storeInformationID;
    }

    public void setStoreInformationID(Long storeInformationID) {
        this.storeInformationID = storeInformationID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHotline() {
        return hotline;
    }

    public void setHotline(String hotline) {
        this.hotline = hotline;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    public String getClosingHours() {
        return closingHours;
    }

    public void setClosingHours(String closingHours) {
        this.closingHours = closingHours;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }
}
