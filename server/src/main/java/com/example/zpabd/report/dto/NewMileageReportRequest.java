package com.example.zpabd.report.dto;

public record NewMileageReportRequest(Long carId, Float mileage, String type, String notes) {
}
