package edu.guilherme.zippygobackend.repository;

import edu.guilherme.zippygobackend.model.Trophy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TrophyRepository extends JpaRepository<Trophy, UUID> {
}
