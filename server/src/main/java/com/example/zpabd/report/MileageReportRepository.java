package com.example.zpabd.report;

import com.example.zpabd.car.Car;
import com.example.zpabd.report.dto.MileageReportAvg;
import com.example.zpabd.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MileageReportRepository extends JpaRepository<MileageReport, Long> {
    boolean existsByCarAndUser(Car car, User user);
    boolean existsByReportIdAndUser(Long reportId, User user);
    List<MileageReport> findAllByCarAndUserOrderByCreationDateDesc(Car car, User user);
    @Query(nativeQuery = true, value = "SELECT * FROM mileage_report WHERE car = :car")
    Page<MileageReport> findAllByCar(Long car, Pageable pageable);
    @Query(nativeQuery = true, value = "SELECT type, AVG(mileage) AS 'avg' FROM mileage_report WHERE car = :car GROUP BY type ORDER BY type")
    List<MileageReportAvg> calcMileageAvgGroupByType(Long car);
}
