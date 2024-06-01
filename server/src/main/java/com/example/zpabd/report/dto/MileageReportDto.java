package com.example.zpabd.report.dto;

import java.sql.Date;

public record MileageReportDto(
        Long reportId,
        Long userId,
        String username,
        String userRole,
        Date creationDate,
        Long carId,
        Float mileage,
        String type,
        String notes) {
}
