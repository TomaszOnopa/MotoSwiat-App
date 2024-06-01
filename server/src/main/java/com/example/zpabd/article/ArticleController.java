package com.example.zpabd.article;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("/get")
    public ResponseEntity<?> article(@RequestParam Long id) {
        try {
            Map<String, Object> article = articleService.getArticle(id);
            if (article.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok(article);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> articleList(@RequestParam(defaultValue = "1") int page, @RequestParam int size) {
        try {
            return ResponseEntity.ok(articleService.getArticlePage(page, size));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/list-by-title")
    public ResponseEntity<?> articleListTitleContaining(@RequestParam String title, @RequestParam(defaultValue = "1") int page, @RequestParam int size) {
        try {
            return ResponseEntity.ok(articleService.getArticlePageWithTitleContaining(title, page, size));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
