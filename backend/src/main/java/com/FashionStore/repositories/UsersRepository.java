package com.FashionStore.repositories;

import com.FashionStore.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    List<Users> findUsersByEmail(String email);
    List<Users> findUsersByEmailContaining(String email);
    List<Users> findUsersByPhoneNumber(String phoneNumber);
    List<Users> findUsersByEmailAndHashedPassword(String email, String hashedPassword);
    List<Users> findUsersByPhoneNumberAndHashedPassword(String phoneNumber, String hashedPassword);

    Users findUsersByUserID(Long userID);
}
