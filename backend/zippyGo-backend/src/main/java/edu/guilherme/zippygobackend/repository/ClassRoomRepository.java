
package edu.guilherme.zippygobackend.repository;

import edu.guilherme.zippygobackend.model.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, String> {
    Optional<ClassRoom> findByCode(String code);

}
