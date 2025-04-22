package edu.guilherme.zippygobackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class ClassRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;
    private String code;
    private String name;
    private String school;
    private boolean active;
    @OneToMany(mappedBy = "classroom")
    @JsonManagedReference  // Adiciona aqui para evitar o loop infinito
    private Set<Student> students = new HashSet<>();

    public void addStudent(Student student) {
        students.add(student);
        student.setClassroom(this);
    }
}
