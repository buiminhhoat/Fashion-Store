package com.FashionStore.controllers;

import com.FashionStore.models.Address;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.AddressRepository;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
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

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Value("${header.authorization}")
    private String headerAuthorization;

    @Value("${authorization.bearer}")
    private String authorizationBearer;

    @Value("${param.addressID}")
    private String paramAddressID;

    @Value("${param.recipientName}")
    private String paramRecipientName;

    @Value("${param.recipientPhone}")
    private String paramRecipientPhone;

    @Value("${param.addressDetails}")
    private String paramAddressDetails;

    @Value("${param.isDefault}")
    private String paramIsDefault;

    @Value("${param.userID}")
    private String paramUserID;

    private final String RESPONSE_TOKEN_INVALID;

    private final String RESPONSE_ADDRESS_NEW_SUCCESS;

    private final String RESPONSE_ERROR;

    private final String RESPONSE_ADDRESS_EDIT_SUCCESS;

    private final String RESPONSE_ADDRESS_DELETE_SUCCESS;

    private final String RESPONSE_ADDRESS_SET_DEFAULT_SUCCESS;

    @Autowired
    public AddressController(MessageSource messageSource) {
        this.RESPONSE_TOKEN_INVALID = messageSource.getMessage("response.token.invalid", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADDRESS_NEW_SUCCESS = messageSource.getMessage("response.address.new.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ERROR = messageSource.getMessage("response.error", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADDRESS_EDIT_SUCCESS = messageSource.getMessage("response.address.edit.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADDRESS_DELETE_SUCCESS = messageSource.getMessage("response.address.delete.success", null, LocaleContextHolder.getLocale());
        this.RESPONSE_ADDRESS_SET_DEFAULT_SUCCESS = messageSource.getMessage("response.address.set-default.success", null, LocaleContextHolder.getLocale());
    }

    @PostMapping("${endpoint.public.get-address}")
    public ResponseEntity<?> getAddress(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter(paramAddressID));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        return ResponseEntity.ok(address);
    }

    @PostMapping("${endpoint.public.new-address}")
    public ResponseEntity<?> newAddress(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        String recipientName = String.valueOf(request.getParameter(paramRecipientName));
        String recipientPhone = request.getParameter(paramRecipientPhone);
        String addressDetails = request.getParameter(paramAddressDetails);
        boolean isDefault = Boolean.parseBoolean(request.getParameter(paramIsDefault));

        Long userID = Long.valueOf(request.getParameter(paramUserID));

        Users usersByEmail = usersRepository.findUsersByEmail(email);

        if (usersByEmail == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        boolean isAdmin = usersByEmail.getIsAdmin();

        if (!isAdmin && !Objects.equals(usersByEmail.getUserID(), userID)) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
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
            ResponseObject responseObject = new ResponseObject(RESPONSE_ADDRESS_NEW_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.public.edit-address}")
    public ResponseEntity<?> editAddress(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        Long addressID = Long.valueOf(request.getParameter(paramAddressID));

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Address address = addressRepository.findAddressByAddressID(addressID);

        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        String recipientName = String.valueOf(request.getParameter(paramRecipientName));
        String recipientPhone = request.getParameter(paramRecipientPhone);
        String addressDetails = request.getParameter(paramAddressDetails);
        boolean isDefault = Boolean.parseBoolean(request.getParameter(paramIsDefault));

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
            ResponseObject responseObject = new ResponseObject(RESPONSE_ADDRESS_EDIT_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.public.delete-address}")
    public ResponseEntity<?> deleteAddress(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter(paramAddressID));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        addressRepository.delete(address);
        ResponseObject responseObject = new ResponseObject(RESPONSE_ADDRESS_DELETE_SUCCESS);
        return ResponseEntity.ok(responseObject);
    }

    @PostMapping("${endpoint.public.set-default-address}")
    public ResponseEntity<?> setDefaultAddress(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);

        boolean isAdmin = usersRepository.findUsersByEmail(email).getIsAdmin();

        Long addressID = Long.valueOf(request.getParameter(paramAddressID));

        Address address = addressRepository.findAddressByAddressID(addressID);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users users = usersRepository.findUsersByUserID(address.getUsersID());
        if (!isAdmin && !Objects.equals(users.getEmail(), jwtTokenUtil.getEmailFromToken(accessToken))) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
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
            ResponseObject responseObject = new ResponseObject(RESPONSE_ADDRESS_SET_DEFAULT_SUCCESS);
            return ResponseEntity.ok(responseObject);
        } catch (Error error) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_ERROR);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
    }

    @PostMapping("${endpoint.public.get-all-addresses}")
    public ResponseEntity<?> getAllAddresses(HttpServletRequest request) {
        String accessToken = request.getHeader(headerAuthorization);
        accessToken = accessToken.replace(authorizationBearer, "");
        Long userID = Long.valueOf(request.getParameter(paramUserID));
        if (!jwtTokenUtil.isTokenValid(accessToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = jwtTokenUtil.getEmailFromToken(accessToken);
        Users usersByEmail = usersRepository.findUsersByEmail(email);

        if (usersByEmail == null) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }

        boolean isAdmin = usersByEmail.getIsAdmin();

        if (!Objects.equals(usersByEmail.getUserID(), userID) && !isAdmin) {
            ResponseObject responseObject = new ResponseObject(RESPONSE_TOKEN_INVALID);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseObject);
        }
        return ResponseEntity.ok(addressRepository.findAddressByUsersID(userID));
    }
}
