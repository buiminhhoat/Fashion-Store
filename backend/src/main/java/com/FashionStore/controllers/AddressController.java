package com.FashionStore.controllers;

import com.FashionStore.models.Address;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.AddressRepository;
import com.FashionStore.repositories.UsersRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
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


}