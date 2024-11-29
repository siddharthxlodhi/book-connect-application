package com.sid.book;

import com.sid.book.book.Book;
import com.sid.book.role.RoleRepository;
import com.sid.book.role.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@SpringBootApplication
@EnableAsync
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BookConnectApiApplication implements CommandLineRunner {
    private final RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(BookConnectApiApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        Roles role=new Roles();
//        role.setName("USER");
//        role.setCreatedDate(LocalDateTime.now());
//        roleRepository.save(role);
    }
}
