package edu.guilherme.zippygobackend.controller;

import edu.guilherme.zippygobackend.service.ProfessorService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/professor")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService professorService;

    @GetMapping("/teste")
    public void test(){
        System.out.println("Funcionando");
    }

    @PostMapping("/{professorId}/alunos/{studentId}")
    public ResponseEntity <String> addStudentToProfessor(@PathVariable UUID professorId, @PathVariable UUID studentId) {
        professorService.linkProfessorToStudent(professorId, studentId);
        return ResponseEntity.ok("Aluno adicionado com sucesso");
    }

    @DeleteMapping("/{professorId}/alunos/{studentId}")
    public ResponseEntity<String> removeStudentFromProfessor(@PathVariable UUID professorId, @PathVariable UUID studentId) {
        professorService.unlinkProfessorFromStudent(professorId, studentId);
        return ResponseEntity.ok("Aluno removido com sucesso");
    }
}
