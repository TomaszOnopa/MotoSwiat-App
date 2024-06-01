package com.example.zpabd.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {
    @Query(nativeQuery = true, value = "SELECT make FROM car GROUP BY make")
    List<String> findAllMake();
    @Query(nativeQuery = true, value = "SELECT model FROM car WHERE make LIKE :make GROUP BY model ORDER BY model")
    List<String> findAllModelByMake(String make);
    @Query(nativeQuery = true, value = "SELECT * FROM car WHERE make LIKE :make AND model LIKE :model GROUP BY generation ORDER BY year_from")
    List<Car> findAllByMakeAndModelGroupByGenerationOrderByGeneration(String make, String model);
    List<Car> findAllByMakeAndModelAndGenerationOrderByTrim(String make, String model, String generation);
    Optional<Car> findCarById(Long id);
}
