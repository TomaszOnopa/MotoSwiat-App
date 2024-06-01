package com.example.zpabd.comment;

import com.example.zpabd.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @NotNull
    private Date creationDate;
    private Long parentId;
    @NotBlank
    private String content;
    @ManyToOne
    @JoinColumn(name = "author")
    private User author;
    @NotNull
    private Long article;
}
