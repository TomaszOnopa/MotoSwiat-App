package com.example.zpabd.car.dto;

import com.example.zpabd.car.Car;

public class CarVersionDtoMapper {
    public static CarVersionDto map(Car car) {
        Long id = car.getId();
        String trim = car.getTrim();
        String series = car.getSeries();
        return new CarVersionDto(id, trim, series);
    }
}
