package com.example.zpabd.article;

import com.example.zpabd.article.dto.NewArticleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping("/add-img")
    public ResponseEntity<?> addArticleImg(@RequestParam("file") MultipartFile[] files) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<String> filenames = articleService.addImg(files);
            result.put("filenames", filenames);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-article")
    public ResponseEntity<?> addArticle(Principal principal, @RequestBody NewArticleRequest request) {
        try {
            Map<String, Object> result = articleService.addArticle(principal.getName(), request);
            if (result.isEmpty())
                return ResponseEntity.badRequest().build();
            else
                return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
