package edu.guilherme.zippygobackend.repository;

import edu.guilherme.zippygobackend.model.Title;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TitleRepository extends JpaRepository<Title, UUID> {
}
