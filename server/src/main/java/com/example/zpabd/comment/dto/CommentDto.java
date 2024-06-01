package com.example.zpabd.comment.dto;

import java.util.Date;

public record CommentDto(Long commentId, Date creationDate, Long parentId, Long authorId, String authorUsername, String content) {
}
