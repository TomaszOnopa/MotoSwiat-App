package com.example.zpabd.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsernameOrEmail(String username, String email);
    Page<User> findAllByUsernameContaining(String username, Pageable pageable);
}
