package com.FashionStore.database;

import com.FashionStore.models.Users;
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
    CommandLineRunner initDatabase(UsersRepository usersRepository) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                Users users = new Users("tiendung050803@gmail.com", "05082003");
                logger.info("insert data: " + usersRepository.save(users));
            }
        };
    }
}
