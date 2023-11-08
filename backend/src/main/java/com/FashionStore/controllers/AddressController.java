package com.FashionStore.controllers;

import com.FashionStore.models.Address;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.AddressRepository;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AddressController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;

    @Autowired
    public AddressController(UsersRepository usersRepository, AddressRepository addressRepository) {
        this.usersRepository = usersRepository;
        this.addressRepository = addressRepository;
    }

    @PostMapping("/get-address")
    public ResponseEntity<?> getAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        return ResponseEntity.ok(address);
    }

    @PostMapping("/new-address")
    public ResponseEntity<?> newAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        String recipientName = String.valueOf(request.getParameter("recipientName"));
        String recipientPhone = request.getParameter("recipientPhone");
        String addressDetails = request.getParameter("addressDetails");
        boolean isDefault = Boolean.parseBoolean(request.getParameter("isDefault"));


        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        Long userID = findByEmail.get(0).getUserID();
        try {
            if (isDefault) {
                Address currentAddressDefault = addressRepository.findAddressByUsersIDAndIsDefault(userID, true);
                if (currentAddressDefault != null) {
                    currentAddressDefault.setIsDefault(false);
                    addressRepository.save(currentAddressDefault);
                }
            }
            Address address = new Address(userID, recipientName, recipientPhone, addressDetails, isDefault);
            addressRepository.save(address);
            ResponseObject responseObject = new ResponseObject("Thêm địa chỉ mới thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Đã có lỗi xảy ra");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("/edit-address")
    public ResponseEntity<?> editAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String recipientName = String.valueOf(request.getParameter("recipientName"));
        String recipientPhone = request.getParameter("recipientPhone");
        String addressDetails = request.getParameter("addressDetails");
        boolean isDefault = Boolean.parseBoolean(request.getParameter("isDefault"));


        Long userID = users.getUserID();
        try {
            if (isDefault) {
                Address currentAddressDefault = addressRepository.findAddressByUsersIDAndIsDefault(userID, true);
                if (currentAddressDefault != null) {
                    currentAddressDefault.setIsDefault(false);
                    addressRepository.save(currentAddressDefault);
                }
            }

            address.setRecipientName(recipientName);
            address.setRecipientPhone(recipientPhone);
            address.setAddressDetails(addressDetails);
            address.setIsDefault(isDefault);

            addressRepository.save(address);
            ResponseObject responseObject = new ResponseObject("Đã chỉnh sửa địa chỉ thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Đã có lỗi xảy ra");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }


    @PostMapping("/get-all-addresses")
    public ResponseEntity<?> getAllAddresses(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        List<Users> findByEmail = usersRepository.findUsersByEmail(email);
        if (findByEmail.isEmpty()) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        Long userID = findByEmail.get(0).getUserID();

        return ResponseEntity.ok(addressRepository.findAddressByUsersID(userID));
    }



}