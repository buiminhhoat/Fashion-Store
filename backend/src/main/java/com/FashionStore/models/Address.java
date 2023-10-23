package com.FashionStore.models;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AddressID")
    private Long addressID;

    @ManyToOne
    @JoinColumn(name = "UserID")
    private Users users;

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

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
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
                ", users=" + users +
                ", recipientName='" + recipientName + '\'' +
                ", recipientPhone='" + recipientPhone + '\'' +
                ", addressDetails='" + addressDetails + '\'' +
                '}';
    }
}