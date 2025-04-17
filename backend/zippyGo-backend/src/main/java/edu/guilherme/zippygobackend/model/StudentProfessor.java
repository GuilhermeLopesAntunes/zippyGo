package edu.guilherme.zippygobackend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="student_professor")
public class StudentProfessor {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    private LocalDateTime linkedAt = LocalDateTime.now();

}
