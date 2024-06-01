package com.example.zpabd.article;

import com.example.zpabd.article.dto.ArticleDto;
import com.example.zpabd.article.dto.ArticleDtoMapper;
import com.example.zpabd.article.dto.ArticleListItemDto;
import com.example.zpabd.article.dto.ArticleListItemDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

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

    private Map<String, Object> createPageData(Page<Article> page) {
        List<ArticleListItemDto> articles = page.getContent().stream().map(ArticleListItemDtoMapper::map).toList();

        Map<String, Object> result = new HashMap<>();
        result.put("articles", articles);
        result.put("totalItems", page.getTotalElements());
        result.put("totalPages", page.getTotalPages());

        return result;
    }
}
