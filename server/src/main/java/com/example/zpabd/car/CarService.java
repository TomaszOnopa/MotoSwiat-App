package com.example.zpabd.car;


import com.example.zpabd.car.dto.CarGenerationDto;
import com.example.zpabd.car.dto.CarGenerationDtoMapper;
import com.example.zpabd.car.dto.CarVersionDto;
import com.example.zpabd.car.dto.CarVersionDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public Map<String, List<String>> getCarMakes() {
        List<String> makes = carRepository.findAllMake();

        Map<String, List<String>> result = new HashMap<>();
        result.put("carMakes", makes);
        return result;
    }

    public Map<String, List<String>> getCarModels(String make) {
        List<String> models = carRepository.findAllModelByMake(make);

        Map<String, List<String>> result = new HashMap<>();
        if (models.size() != 0) {
            result.put("carModels", models);
        }
        return result;
    }

    public Map<String, List<CarGenerationDto>> getCarGenerations(String make, String model) {
        List<CarGenerationDto> generations = carRepository.findAllByMakeAndModelGroupByGenerationOrderByGeneration(make, model)
                .stream()
                .map(CarGenerationDtoMapper::map)
                .toList();

        Map<String, List<CarGenerationDto>> result = new HashMap<>();
        if (generations.size() != 0) {
            result.put("carGenerations", generations);
        }
        return result;
    }

    public Map<String, List<CarVersionDto>> getCarVersions(String make, String model, String generation) {
        List<CarVersionDto> versions = carRepository.findAllByMakeAndModelAndGenerationOrderByTrim(make, model, generation)
                .stream()
                .map(CarVersionDtoMapper::map)
                .toList();

        Map<String, List<CarVersionDto>> result = new HashMap<>();
        if (versions.size() != 0) {
            result.put("carVersions", versions);
        }
        return result;
    }

    public Map<String, Car> getCarSpecs(Long id) {
        Optional<Car> car = carRepository.findCarById(id);

        Map<String, Car> result = new HashMap<>();
        car.ifPresent(value -> result.put("car", value));
        return result;
    }
}
