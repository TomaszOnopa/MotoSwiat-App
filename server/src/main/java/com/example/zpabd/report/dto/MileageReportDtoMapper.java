package com.example.zpabd.report.dto;

import com.example.zpabd.report.MileageReport;

import java.sql.Date;

public class MileageReportDtoMapper {
    public static MileageReportDto map(MileageReport mileageReport) {
        Long reportId = mileageReport.getReportId();
        Long userId = mileageReport.getUser().getUserId();
        String username = mileageReport.getUser().getUsername();
        String userRole = mileageReport.getUser().getRole();
        Date creationDate = mileageReport.getCreationDate();
        Long carId = mileageReport.getCar().getId();
        Float mileage = mileageReport.getMileage();
        String type = mileageReport.getType();
        String notes = mileageReport.getNotes();
        return new MileageReportDto(reportId, userId, username, userRole, creationDate, carId, mileage, type, notes);
    }
}
