package com.example.zpabd.article;

import com.example.zpabd.article.dto.*;
import com.example.zpabd.config.FileUploadUtil;
import com.example.zpabd.user.User;
import com.example.zpabd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final AttachmentRepository attachmentRepository;

    public Map<String, Object> getArticle(Long articleId) {
        Map<String, Object> result = new HashMap<>();

        Optional<ArticleDto> article = articleRepository.findById(articleId)
                .map(ArticleDtoMapper::map);
        article.ifPresent(articleDto -> result.put("article", articleDto));

        return result;
    }

    public Map<String, Object> getArticlePage(int pageNum, int pageSize) {
        Pageable paging = PageRequest.of(pageNum-1, pageSize, Sort.by("date").descending());
        Page<Article> page = articleRepository.findAll(paging);

        return createPageData(page);
    }

    public Map<String, Object> getArticlePageWithTitleContaining(String title, int pageNum, int pageSize) {
        Pageable paging = PageRequest.of(pageNum-1, pageSize, Sort.by("date").descending());
        Page<Article> page = articleRepository.findAllByTitleContaining(title, paging);

        return createPageData(page);
    }

    public List<String> addImg(MultipartFile[] files) throws IOException {
        List<String> filenames = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename;
            do {
                filename = FileUploadUtil.generateFilename(file.getOriginalFilename());
            } while (attachmentRepository.existsByFilename(filename));
            String uploadDir = "img";
            FileUploadUtil.saveFile(uploadDir, filename, file);
            filenames.add(filename);
        }
        return filenames;
    }

    public Map<String, Object> addArticle(String username, NewArticleRequest request) {
        Map<String, Object> result = new HashMap<>();

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Article newArticle = new Article();
            newArticle.setTitle(request.title());
            newArticle.setContent(request.content());
            newArticle.setAuthor(user.get());
            newArticle.setDate(new Date());

            Article article = articleRepository.save(newArticle);
            result.put("article", article);

            for (String filename: request.filenames()) {
                Attachment attachment = new Attachment();
                attachment.setArticle(article);
                attachment.setFilename(filename);
                attachmentRepository.save(attachment);
            }
        }
        return result;
    }

    private Map<String, Object> createPageData(Page<Article> page) {
        List<ArticleListItemDto> articles = page.getContent().stream().map(ArticleListItemDtoMapper::map).toList();

        Map<String, Object> result = new HashMap<>();
        result.put("articles", articles);
        result.put("totalItems", page.getTotalElements());
        result.put("totalPages", page.getTotalPages());

        return result;
    }
}
