package com.example.zpabd.article.dto;

import com.example.zpabd.article.Article;
import com.example.zpabd.article.Attachment;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class ArticleDtoMapper {
    public static ArticleDto map(Article article) {
        Long articleId = article.getArticleId();
        String title = article.getTitle();
        Date date = article.getDate();
        List<String> content = Arrays.stream(article.getContent().split("\n")).toList();
        Long authorId = article.getAuthor().getUserId();
        String authorName = article.getAuthor().getName();
        String authorSurname = article.getAuthor().getSurname();
        String authorImg = article.getAuthor().getImg();
        List<Attachment> attachments = article.getAttachments();
        List<String> filenames = new ArrayList<>();
        for (Attachment attachment : attachments)
            filenames.add(attachment.getFilename());

        return new ArticleDto(articleId, title, date, content, authorId, authorName, authorSurname, authorImg, filenames);
    }
}
