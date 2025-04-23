package edu.guilherme.zippygobackend.controller;

import edu.guilherme.zippygobackend.dto.ClassRoomsAssociationRequest;
import edu.guilherme.zippygobackend.dto.StudentAssociationRequest;
import edu.guilherme.zippygobackend.model.Student;
import edu.guilherme.zippygobackend.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
    @RequestMapping("/professor")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService professorService;

    @GetMapping("/teste")
    public void test() {
        System.out.println("Funcionando");
    }

    @PostMapping("/{professorId}/students")
    public ResponseEntity<String> addStudentsToProfessor(
            @PathVariable UUID professorId,
            @RequestBody StudentAssociationRequest request
    ) {
        professorService.linkProfessorToStudent(professorId, request.studentIds());
        return ResponseEntity.ok("Alunos adicionados com sucesso");
    }

    @DeleteMapping("/{professorId}/alunos")
    public ResponseEntity<String> removeStudentsFromProfessor(
            @PathVariable UUID professorId,
            @RequestBody StudentAssociationRequest request
    ) {
        professorService.unlinkProfessorFromStudents(professorId, request.studentIds());
        return ResponseEntity.ok("Alunos removidos com sucesso");
    }

    @PostMapping("/{professorId}/classroom")
    public ResponseEntity<String> addClassRoomToProfessor(
            @PathVariable UUID professorId,
            @RequestBody ClassRoomsAssociationRequest request
            ){
        professorService.linkProfessorFromClassRoom(professorId,request.classRoomId());
        return ResponseEntity.ok("Salas de aula adicionadas com sucesso");
    }
    @DeleteMapping("/{professorId}/classroom")
    public ResponseEntity<String> removeClassRoomFromProfessor(
            @PathVariable UUID professorId,
            @RequestBody ClassRoomsAssociationRequest request
    ){
        professorService.unlinkProfessorFromClassRoom(professorId,request.classRoomId());
        return ResponseEntity.ok("Alunos removidos com sucesso");
    }
}
