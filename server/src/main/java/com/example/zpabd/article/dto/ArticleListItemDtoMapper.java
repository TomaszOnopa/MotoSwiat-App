package com.example.zpabd.article.dto;

import com.example.zpabd.article.Article;

import java.util.Date;

public class ArticleListItemDtoMapper {
    public static ArticleListItemDto map(Article article) {
        Long articleId = article.getArticleId();
        String title = article.getTitle();
        Date date = article.getDate();
        String image = article.getAttachments().size() > 0 ? article.getAttachments().get(0).getFilename() : null;;

        return new ArticleListItemDto(articleId, title, date, image);
    }
}
