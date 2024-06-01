package com.example.zpabd.article.dto;

import java.util.Date;
import java.util.List;

public record ArticleDto(
        Long articleId,
        String title,
        Date date,
        List<String> content,
        Long authorId,
        String authorName,
        String authorSurname,
        String authorImg,
        List<String> attachments) {
}
