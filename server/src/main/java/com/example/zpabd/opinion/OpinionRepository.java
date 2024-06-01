package com.example.zpabd.opinion;

import com.example.zpabd.car.Car;
import com.example.zpabd.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    boolean existsByCarAndUser(Car car, User user);
    boolean existsByOpinionIdAndUser(Long opinionId, User user);
    Optional<Opinion> findByCarAndUser(Car car, User user);
    @Query(nativeQuery = true, value = "SELECT * FROM opinion WHERE car = :car")
    Page<Opinion> findAllByCar(Long car, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT AVG(rating) FROM opinion WHERE car = :car")
    Optional<Float> calcRatingAvg(Long car);
}
