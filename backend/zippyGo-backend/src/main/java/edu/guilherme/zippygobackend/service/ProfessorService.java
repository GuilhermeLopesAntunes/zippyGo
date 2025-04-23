package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.ClassRoom;
import edu.guilherme.zippygobackend.model.Professor;
import edu.guilherme.zippygobackend.model.Student;
import edu.guilherme.zippygobackend.repository.ClassRoomRepository;
import edu.guilherme.zippygobackend.repository.ProfessorRepository;
import edu.guilherme.zippygobackend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final StudentRepository studentRepository;
    private final ClassRoomRepository classRoomRepository;

    public void linkProfessorToStudent(UUID professorId, List<UUID> studentIds) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        for (UUID studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Aluno com ID " + studentId + " não encontrado"));

            professor.addStudent(student);
        }

        professorRepository.save(professor);
    }


    public void unlinkProfessorFromStudents(UUID professorId, List<UUID> studentIds) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        for (UUID studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Aluno com ID " + studentId + " não encontrado"));

            professor.removeStudent(student);
        }

        professorRepository.save(professor);
    }

    public void linkProfessorFromClassRoom(UUID professorId, List<String> classroomIds) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(()-> new RuntimeException("Professor não Encontrado"));
        for (String classroomId : classroomIds) {
            ClassRoom classRoom = classRoomRepository.findByCode(classroomId)
                    .orElseThrow(()-> new RuntimeException("Sala de aula com Código " + classroomId+" Não encontrada"));
            professor.addClassRoom(classRoom);
            System.out.println("Classroom code " + classRoom);
        }

        professorRepository.save(professor);
    }

    public void unlinkProfessorFromClassRoom(UUID professorId, List<String> classroomIds) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(()-> new RuntimeException("Professor não Encontrado"));
        for (String classroomId : classroomIds) {
            ClassRoom classRoom = classRoomRepository.findByCode(classroomId)
                    .orElseThrow(()-> new RuntimeException("Sala de aula com Código " + classroomId+" Não encontrada"));
            professor.removeClassRoom(classRoom);
        }

        professorRepository.save(professor);
    }



}