package com.example.zpabd.comment;

import com.example.zpabd.article.ArticleRepository;
import com.example.zpabd.comment.dto.CommentDto;
import com.example.zpabd.comment.dto.CommentDtoMapper;
import com.example.zpabd.comment.dto.EditCommentRequest;
import com.example.zpabd.comment.dto.NewCommentRequest;
import com.example.zpabd.user.User;
import com.example.zpabd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public Map<String, Object> getAllByArticleId(Long articleId) {
        List<CommentDto> comments = commentRepository.findAllByArticleOrderByCreationDateDesc(articleId)
                .stream()
                .filter(comment -> !Objects.equals(comment.getAuthor().getRole(), "BANNED"))
                .map(CommentDtoMapper::map)
                .toList();
        Map<String, Object> result = new HashMap<>();

        if (comments.size() != 0) {
            result.put("comments", comments);
        }
        return result;
    }

    public CommentDto addComment(String username, NewCommentRequest request) {
        if (request.articleId() == null || request.content() == null)
            return null;

        Optional<User> user = userRepository.findByUsername(username);
        boolean article = articleRepository.existsById(request.articleId());

        if (article && user.isPresent()) {
            Comment comment = Comment.builder()
                    .author(user.get())
                    .article(request.articleId())
                    .content(request.content())
                    .creationDate(new Date())
                    .parentId(request.parentId())
                    .build();

            Comment result = commentRepository.save(comment);
            return CommentDtoMapper.map(result);
        }
        return null;
    }

    public void deleteComment(String username, Long commentId) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            if (commentRepository.existsByCommentIdAndAuthor(commentId, user.get())) {
                commentRepository.deleteById(commentId);
                return;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public void updateComment(String username, EditCommentRequest request) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Optional<Comment> comment = commentRepository.findByCommentIdAndAuthor(request.commentId(), user.get());
            if (comment.isPresent()) {
                comment.get().setContent(request.content());
                return;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
