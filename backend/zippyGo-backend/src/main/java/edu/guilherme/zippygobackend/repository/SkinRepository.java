package edu.guilherme.zippygobackend.repository;

import edu.guilherme.zippygobackend.model.Skin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SkinRepository extends JpaRepository<Skin, UUID> {
}
