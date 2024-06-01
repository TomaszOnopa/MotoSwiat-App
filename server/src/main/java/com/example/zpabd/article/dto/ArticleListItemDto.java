package com.example.zpabd.article.dto;

import java.util.Date;

public record ArticleListItemDto(
        Long articleId,
        String title,
        Date date,
        String image
) {
}
