package com.example.zpabd.comment.dto;

public record NewCommentRequest(Long articleId, Long parentId, String content) {
}
