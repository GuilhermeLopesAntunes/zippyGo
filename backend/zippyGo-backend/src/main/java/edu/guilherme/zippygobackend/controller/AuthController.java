package edu.guilherme.zippygobackend.controller;

import edu.guilherme.zippygobackend.dto.LoginDTO;
import edu.guilherme.zippygobackend.dto.RegisterProfessorDTO;
import edu.guilherme.zippygobackend.dto.RegisterStudentDTO;
import edu.guilherme.zippygobackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegisterStudentDTO data){
        authService.registerStudent(data);
        return ResponseEntity.ok(data.toString());
    }

    @PostMapping("/register/professor")
    public ResponseEntity<?> registerProfessor(@Valid @RequestBody RegisterProfessorDTO data){
        authService.registerProfessor(data);
        return ResponseEntity.ok(data.toString());
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(@RequestBody LoginDTO data){
        var token = authService.login(data);
        return ResponseEntity.ok(token);
    }
}
