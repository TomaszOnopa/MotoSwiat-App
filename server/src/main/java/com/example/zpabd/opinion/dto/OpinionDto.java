package com.example.zpabd.opinion.dto;

import java.sql.Date;

public record OpinionDto(
        Long opinionId,
        Long userId,
        String username,
        String userRole,
        Date creationDate,
        Long carId,
        Float rating,
        String comment) {
}
