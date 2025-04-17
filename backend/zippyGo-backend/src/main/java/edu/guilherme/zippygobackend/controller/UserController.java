package edu.guilherme.zippygobackend.controller;

import edu.guilherme.zippygobackend.model.User;
import edu.guilherme.zippygobackend.repository.UserRepository;
import edu.guilherme.zippygobackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
