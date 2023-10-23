package com.FashionStore.repositories;

import com.FashionStore.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAddressByUsersID(Long userId);
}
