package edu.guilherme.zippygobackend.repository;

import edu.guilherme.zippygobackend.model.Professor;
import edu.guilherme.zippygobackend.model.Student;
import edu.guilherme.zippygobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}


