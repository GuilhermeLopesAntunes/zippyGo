package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.Professor;
import edu.guilherme.zippygobackend.model.Student;
import edu.guilherme.zippygobackend.repository.ProfessorRepository;
import edu.guilherme.zippygobackend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final StudentRepository studentRepository;

    public void linkProfessorToStudent(UUID professorId, UUID studentId) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        professor.addStudent(student);
        professorRepository.save(professor);
    }

    public void unlinkProfessorFromStudent(UUID professorId, UUID studentId) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        professor.removeStudent(student);
        professorRepository.save(professor);
    }
}
