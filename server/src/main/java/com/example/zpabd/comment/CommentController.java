package com.example.zpabd.comment;

import com.example.zpabd.comment.dto.CommentDto;
import com.example.zpabd.comment.dto.EditCommentRequest;
import com.example.zpabd.comment.dto.NewCommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<?> get(@RequestParam Long articleId) {
        try {
            Map<String, Object> comments = commentService.getAllByArticleId(articleId);
            if (comments.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER') or hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_PUBLICIST')")
    @PostMapping("add")
    public ResponseEntity<?> add(Principal principal, @RequestBody NewCommentRequest request) {
        try {
            CommentDto comment = commentService.addComment(principal.getName(), request);
            if (comment != null)
                return ResponseEntity.ok(comment);
            else
                return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER') or hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_PUBLICIST')")
    @DeleteMapping("delete")
    public ResponseEntity<?> delete(Principal principal, @RequestParam Long id) {
        try {
            commentService.deleteComment(principal.getName(), id);
            return ResponseEntity.ok().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER') or hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_PUBLICIST')")
    @PostMapping("update")
    public ResponseEntity<?> update(Principal principal, @RequestBody EditCommentRequest request) {
        try {
            commentService.updateComment(principal.getName(), request);
            return ResponseEntity.ok().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
