package com.example.zpabd.article.dto;

import java.util.List;

public record NewArticleRequest(String title, String content, List<String> filenames) {
}
