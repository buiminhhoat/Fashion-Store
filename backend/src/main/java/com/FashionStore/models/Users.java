package com.FashionStore.models;

import jakarta.persistence.*;

@Entity
@Table(name="Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userID;

    private String fullName;

    private String email;
    private String hashedPassword;

    private String phonenumber;

    private String gender;

    private String dataBirthday;

    private String avatarPath;

    public Users() {

    }

    public Users(String fullName, String email, String hashedPassword, String phonenumber) {
        this.fullName = fullName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.phonenumber = phonenumber;
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

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDataBirthday() {
        return dataBirthday;
    }

    public void setDataBirthday(String dataBirthday) {
        this.dataBirthday = dataBirthday;
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
                ", phonenumber='" + phonenumber + '\'' +
                ", gender='" + gender + '\'' +
                ", dataBirthday='" + dataBirthday + '\'' +
                ", avatarPath='" + avatarPath + '\'' +
                '}';
    }
}
