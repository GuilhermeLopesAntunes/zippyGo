package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.dto.LoginDTO;
import edu.guilherme.zippygobackend.dto.RegisterProfessorDTO;
import edu.guilherme.zippygobackend.dto.RegisterStudentDTO;
import edu.guilherme.zippygobackend.enums.UserRole;
import edu.guilherme.zippygobackend.model.Professor;
import edu.guilherme.zippygobackend.model.Student;
import edu.guilherme.zippygobackend.model.User;
import edu.guilherme.zippygobackend.repository.UserRepository;
import edu.guilherme.zippygobackend.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public void registerStudent(@Valid RegisterStudentDTO data){
        var user = new Student();
        user.setName(data.name());
        user.setUsername(data.username());
        user.setEmail(data.email());
        user.setPassword(passwordEncoder.encode(data.password()));
        user.setRole(UserRole.STUDENT);
        user.setXp(0);
        user.setRuby(10);
        user.setLevel(1);

        userRepository.save(user);
    }

    public void registerProfessor(@Valid RegisterProfessorDTO data){
        var user = new Professor();
        user.setName(data.name());
        user.setUsername(data.username());
        user.setEmail(data.email());
        user.setPassword(passwordEncoder.encode(data.password()));
        user.setRole(UserRole.PROFESSOR);
        user.setSubject(data.subject());

        userRepository.save(user);
    }

    public String login(LoginDTO data){
        var authToken = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = authenticationManager.authenticate(authToken);

        var user = (User) auth.getPrincipal();
        return tokenService.generateToken(user.getUsername(), user.getRole());
    }
}
