package com.FashionStore.models;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    private String fullName;

    private String email;
    private String hashedPassword;

    private String phoneNumber;

    private String gender;

    private Date dateBirthday;

    private String avatarPath;

    public Users() {

    }

    public Users(String fullName, String email, String hashedPassword, String phoneNumber) {
        this.fullName = fullName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getUserID() {
        return userID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateBirthday() {
        return dateBirthday;
    }

    public void setDateBirthday(Date dateBirthday) {
        this.dateBirthday = dateBirthday;
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userID=" + userID +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", hashedPassword='" + hashedPassword + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", dateBirthday='" + dateBirthday + '\'' +
                ", avatarPath='" + avatarPath + '\'' +
                '}';
    }
}
