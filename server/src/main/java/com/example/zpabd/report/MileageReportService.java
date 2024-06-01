package com.example.zpabd.report;

import com.example.zpabd.car.Car;
import com.example.zpabd.car.CarRepository;
import com.example.zpabd.report.dto.MileageReportAvg;
import com.example.zpabd.report.dto.MileageReportDto;
import com.example.zpabd.report.dto.MileageReportDtoMapper;
import com.example.zpabd.report.dto.NewMileageReportRequest;
import com.example.zpabd.user.User;
import com.example.zpabd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MileageReportService {
    private final static int REPORTS_PER_PAGE = 4;
    private final MileageReportRepository mileageReportRepository;
    public final CarRepository carRepository;
    public final UserRepository userRepository;

    public Map<String, Object> getMileageReports(Long carId, int pageNum) {
        Pageable paging = PageRequest.of(pageNum-1, REPORTS_PER_PAGE, Sort.by("creation_date").descending());
        Page<MileageReport> page = mileageReportRepository.findAllByCar(carId, paging);

        List<MileageReportDto> mileageReports = page
                .getContent()
                .stream()
                .map(MileageReportDtoMapper::map)
                .toList();

        Map<String, Object> result = new HashMap<>();
        result.put("mileageReports", mileageReports);
        result.put("totalItems", page.getTotalElements());
        result.put("totalPages", page.getTotalPages());

        return result;
    }

    public Map<String, Object> getUserMileageReports(String username, Long carId) {
        Map<String, Object> result = new HashMap<>();

        Optional<User> user = userRepository.findByUsername(username);
        Optional<Car> car = carRepository.findCarById(carId);

        if (car.isPresent() && user.isPresent()) {
            List<MileageReportDto> mileageReports = mileageReportRepository.findAllByCarAndUserOrderByCreationDateDesc(car.get(), user.get())
                    .stream()
                    .map(MileageReportDtoMapper::map)
                    .toList();
            result.put("mileageReports", mileageReports);
        }

        return result;
    }

    public Map<String, Object> getMileageAvg(Long carId) {
        List<MileageReportAvg> mileageAvg = mileageReportRepository.calcMileageAvgGroupByType(carId);

        Map<String, Object> result = new HashMap<>();
        for (MileageReportAvg avg: mileageAvg) {
            result.put(avg.getType(), avg.getAvg());
        }

        return result;
    }

    public MileageReportDto addReport(String username, NewMileageReportRequest request) {
        if (request.mileage() == null || request.type() == null) return null;

        Optional<User> user = userRepository.findByUsername(username);
        Optional<Car> car = carRepository.findCarById(request.carId());

        if (car.isPresent() && user.isPresent()) {
            MileageReport report = MileageReport.builder()
                    .user(user.get())
                    .car(car.get())
                    .creationDate(Date.valueOf(LocalDate.now()))
                    .mileage(request.mileage())
                    .type(request.type())
                    .notes(request.notes())
                    .build();
            MileageReport result = mileageReportRepository.save(report);
            return MileageReportDtoMapper.map(result);
        }
        return null;
    }

    public void deleteReport(String username, Long reportId) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            if (mileageReportRepository.existsByReportIdAndUser(reportId, user.get())) {
                mileageReportRepository.deleteById(reportId);
                return;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
