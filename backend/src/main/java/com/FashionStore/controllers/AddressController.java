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

    @PostMapping("/public/get-address")
    public ResponseEntity<?> getAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        return ResponseEntity.ok(address);
    }

    @PostMapping("/public/new-address")
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

        Long userID = Long.valueOf(request.getParameter("userID"));


        Users usersByEmail = usersRepository.findUsersByEmail(email);

        if (usersByEmail == null) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        boolean isAdmin = usersByEmail.getIsAdmin();
//        Long userID = usersByEmail.getUserID();

        if (!isAdmin && !Objects.equals(usersByEmail.getUserID(), userID)) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
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

    @PostMapping("/public/edit-address")
    public ResponseEntity<?> editAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Address address = addressRepository.findAddressByAddressID(addressID);

        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
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

    @PostMapping("/public/delete-address")
    public ResponseEntity<?> deleteAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        addressRepository.delete(address);
        ResponseObject responseObject = new ResponseObject("Đã xóa địa chỉ thành công");
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("/public/set-default-address")
    public ResponseEntity<?> setDefaultAddress(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter("addressID"));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        Long userID = users.getUserID();
        try {
            Address currentAddressDefault = addressRepository.findAddressByUsersIDAndIsDefault(userID, true);
            if (currentAddressDefault != null) {
                currentAddressDefault.setIsDefault(false);
                addressRepository.save(currentAddressDefault);
            }

            address.setIsDefault(true);
            addressRepository.save(address);
            ResponseObject responseObject = new ResponseObject("Đã thay đổi địa chỉ mặc định thành công");
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject("Đã có lỗi xảy ra");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("/public/get-all-addresses")
    public ResponseEntity<?> getAllAddresses(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        Long userID = Long.valueOf(request.getParameter("userID"));
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users usersByEmail = usersRepository.findUsersByEmail(email);


        if (usersByEmail == null) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        boolean isAdmin = usersByEmail.getIsAdmin();

        if (!Objects.equals(usersByEmail.getUserID(), userID) && !isAdmin) {
            ResponseObject responseObject = new ResponseObject("Token không hợp lệ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        return ResponseEntity.ok(addressRepository.findAddressByUsersID(userID));
    }
}