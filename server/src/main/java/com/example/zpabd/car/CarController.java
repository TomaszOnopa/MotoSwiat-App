package com.example.zpabd.car;

import com.example.zpabd.car.dto.CarGenerationDto;
import com.example.zpabd.car.dto.CarVersionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @GetMapping("brands")
    public ResponseEntity<?> carMakes() {
        try {
            return ResponseEntity.ok(carService.getCarMakes());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("models")
    public ResponseEntity<?> carModels(@RequestParam String make) {
        try {
            Map<String, List<String>> models = carService.getCarModels(make);
            if (models.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(models);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("generations")
    public ResponseEntity<?> carGenerations(@RequestParam String make, @RequestParam String model) {
        try {
            Map<String, List<CarGenerationDto>> generations = carService.getCarGenerations(make, model);
            if (generations.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(generations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("versions")
    public ResponseEntity<?> carVersion(@RequestParam String make, @RequestParam String model, @RequestParam String generation) {
        try {
            Map<String, List<CarVersionDto>> versions = carService.getCarVersions(make, model, generation);
            if (versions.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(versions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("specs")
    public ResponseEntity<?> carSpecs(@RequestParam Long id) {
        try {
            Map<String, Car> specs = carService.getCarSpecs(id);
            if (specs.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(specs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
