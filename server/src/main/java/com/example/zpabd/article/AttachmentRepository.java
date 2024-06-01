package com.example.zpabd.article;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    boolean existsByFilename(String filename);
}
