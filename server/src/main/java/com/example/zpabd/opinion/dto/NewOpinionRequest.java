package com.example.zpabd.opinion.dto;

public record NewOpinionRequest (Long carId, Float rating, String comment) {
}
