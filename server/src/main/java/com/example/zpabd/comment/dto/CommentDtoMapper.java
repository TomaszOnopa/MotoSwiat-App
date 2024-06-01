package com.example.zpabd.comment.dto;

import com.example.zpabd.comment.Comment;

import java.util.Date;

public class CommentDtoMapper {
    public static CommentDto map(Comment comment) {
        Long commentId = comment.getCommentId();
        Date creationDate = comment.getCreationDate();
        Long parentId = comment.getParentId();
        Long authorId = comment.getAuthor().getUserId();
        String authorUsername = comment.getAuthor().getUsername();
        String content = comment.getContent();

        return new CommentDto(commentId, creationDate, parentId, authorId, authorUsername, content);
    }
}
