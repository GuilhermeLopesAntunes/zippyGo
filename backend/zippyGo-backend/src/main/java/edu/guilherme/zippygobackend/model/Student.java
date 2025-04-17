package edu.guilherme.zippygobackend.model;

import edu.guilherme.zippygobackend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@RequiredArgsConstructor
public class Student extends User {
    private int level;
    private double xp;
    private int ruby;

    @ManyToMany
    @JoinTable(
            name = "student_professor",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private Set<Professor> professors = new HashSet<>();

    // Construtor adicional para garantir que o 'role' nunca seja nulo
    public Student(String name, String username, String password, String email, UserRole role) {
        super(name, username, password, email, role);
    }
}
