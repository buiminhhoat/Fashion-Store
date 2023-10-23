package com.FashionStore.repositories;

import com.FashionStore.models.Address;
import com.FashionStore.models.Products;
import com.FashionStore.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAddressByUsers(Users users);
}
