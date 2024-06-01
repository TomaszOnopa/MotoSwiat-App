package com.example.zpabd.article;

import com.example.zpabd.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;
    @NotNull
    @Size(min = 1, max = 255)
    private String title;
    @NotNull
    private Date date;
    @NotBlank
    private String content;
    @ManyToOne
    @JoinColumn(name = "author")
    private User author;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "article")
    private List<Attachment> attachments;
}
