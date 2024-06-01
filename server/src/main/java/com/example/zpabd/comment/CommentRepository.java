package com.example.zpabd.comment;

import com.example.zpabd.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByArticleOrderByCreationDateDesc(Long article);
    boolean existsByCommentIdAndAuthor(Long commentId, User user);
    Optional<Comment> findByCommentIdAndAuthor(Long commentId, User user);
}
