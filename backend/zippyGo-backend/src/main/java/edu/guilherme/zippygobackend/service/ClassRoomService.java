package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.ClassRoom;
import edu.guilherme.zippygobackend.model.Trophy;
import edu.guilherme.zippygobackend.repository.ClassRoomRepository;
import edu.guilherme.zippygobackend.repository.TrophyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClassRoomService {
    private final ClassRoomRepository classRoomRepository;
    private final TrophyRepository trophyRepository;

    public List<ClassRoom> findAll() {
        return classRoomRepository.findAll();
    }
    public Optional<ClassRoom> findById(String id) {
        return classRoomRepository.findById(id);
    }

    public ClassRoom save(ClassRoom classRoom) {
        return classRoomRepository.save(classRoom);
    }
    public Optional<ClassRoom> update(String id, ClassRoom updated) {
        return classRoomRepository.findById(id).map(t->{
            t.setName(updated.getName());
            t.setActive(updated.isActive());
            t.setSchool(updated.getSchool());
            t.setStudents(updated.getStudents());
            t.setCode(updated.getCode());
            return classRoomRepository.save(t);
        });
    }
   public boolean delete(String id) {
        return classRoomRepository.findById(id).map(
                t->{
                    classRoomRepository.delete(t);
                    return true;
                }
        ).orElse(false);
   }
}
