package com.FashionStore.repositories;

import com.FashionStore.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    List<Users> findUserByEmail(String email);
}
