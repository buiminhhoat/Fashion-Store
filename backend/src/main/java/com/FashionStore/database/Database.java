package com.FashionStore.database;

import com.FashionStore.models.Address;
import com.FashionStore.models.Users;
import com.FashionStore.repositories.AddressRepository;
import com.FashionStore.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Database {
    private static final Logger logger = LoggerFactory.getLogger(Database.class);
    @Bean
    CommandLineRunner initDatabase(UsersRepository usersRepository, AddressRepository addressRepository) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//                Users users1 = new Users("Bùi Minh Hoạt", "official.buiminhhoat@gmail.com", "06092003", "0945405xxx");
//                Users users2 = new Users("Nguyễn Tiến Dũng", "tiendung05082003@gmail.com", "05082003", "0903481xxx");
//                logger.info("insert data: " + usersRepository.save(users1));
//                logger.info("insert data: " + usersRepository.save(users2));
//                Address address = new Address(1L, "Bùi Minh Hoạt", "0945405238",
//                        "144 Xuân Thủy, Cầu Giấy, Hà Nội");
//                addressRepository.save(address);
            }
        };
    }
}
