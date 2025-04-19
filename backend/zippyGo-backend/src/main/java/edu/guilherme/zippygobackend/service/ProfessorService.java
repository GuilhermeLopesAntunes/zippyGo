package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.Professor;
import edu.guilherme.zippygobackend.model.Student;
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

}