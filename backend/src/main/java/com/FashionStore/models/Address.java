package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AddressID")
    private Long addressID;

    @Column(name = "UserID")
    private Long usersID;

    @Column(name = "RecipientName")
    private String recipientName;

    @Column(name = "RecipientPhone")
    private String recipientPhone;

    @Column(name = "AddressDetails")
    private String addressDetails;

    public Long getAddressID() {
        return addressID;
    }

    public void setAddressID(Long addressID) {
        this.addressID = addressID;
    }

    public Long getUsersID() {
        return usersID;
    }

    public void setUsersID(Long usersID) {
        this.usersID = usersID;
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

    @Override
    public String toString() {
        return "Address{" +
                "addressID=" + addressID +
                ", usersID=" + usersID +
                ", recipientName='" + recipientName + '\'' +
                ", recipientPhone='" + recipientPhone + '\'' +
                ", addressDetails='" + addressDetails + '\'' +
                '}';
    }

    public Address(Long usersID, String recipientName, String recipientPhone, String addressDetails) {
        this.usersID = usersID;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.addressDetails = addressDetails;
    }
}