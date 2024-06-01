package com.example.zpabd.car.dto;

import com.example.zpabd.car.Car;

public class CarGenerationDtoMapper {
    public static CarGenerationDto map(Car car) {
        String generation = car.getGeneration();
        Short yearFrom = car.getYearFrom();
        Short yearTo = car.getYearTo();
        return new CarGenerationDto(generation, yearFrom, yearTo);
    }
}
