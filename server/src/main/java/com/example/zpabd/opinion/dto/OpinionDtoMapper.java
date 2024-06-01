package com.example.zpabd.opinion.dto;

import com.example.zpabd.opinion.Opinion;

import java.sql.Date;

public class OpinionDtoMapper {
    public static OpinionDto map(Opinion opinion) {
        Long opinionId = opinion.getOpinionId();
        Long userId = opinion.getUser().getUserId();
        String username = opinion.getUser().getUsername();
        String userRole = opinion.getUser().getRole();
        Date creationDate = opinion.getCreationDate();
        Long carId = opinion.getCar().getId();
        Float rating = opinion.getRating();
        String comment = opinion.getComment();

        return new OpinionDto(opinionId, userId, username, userRole, creationDate, carId, rating, comment);
    }
}
