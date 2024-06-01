package com.example.zpabd.report;

import com.example.zpabd.report.dto.MileageReportDto;
import com.example.zpabd.report.dto.NewMileageReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("/api/fuel")
@RequiredArgsConstructor
public class MileageReportController {
    private final MileageReportService mileageReportService;

    @GetMapping("users-list")
    public ResponseEntity<?> mileageReport(Principal principal, Long carId) {
        try {
            return ResponseEntity.ok(mileageReportService.getUserMileageReports(principal.getName(), carId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("list")
    public ResponseEntity<?> mileageReports(@RequestParam Long carId, @RequestParam(defaultValue = "1") int page) {
        try {
            return ResponseEntity.ok(mileageReportService.getMileageReports(carId, page));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("avg")
    public ResponseEntity<?> reportsAvg(@RequestParam Long carId) {
        try {
            return ResponseEntity.ok(mileageReportService.getMileageAvg(carId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Principal principal, @RequestBody NewMileageReportRequest request) {
        try {
            MileageReportDto report = mileageReportService.addReport(principal.getName(), request);
            if (report != null)
                return ResponseEntity.ok(report);
            else
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> delete(Principal principal, @RequestParam Long reportId) {
        try {
            mileageReportService.deleteReport(principal.getName(), reportId);
            return ResponseEntity.ok().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
