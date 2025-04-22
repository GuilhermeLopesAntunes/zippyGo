package edu.guilherme.zippygobackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToMany(mappedBy = "students")
    private Set<Professor> professors = new HashSet<>();

    // Construtor adicional para garantir que o 'role' nunca seja nulo
    public Student(String name, String username, String password, String email, UserRole role) {
        super(name, username, password, email, role);
    }

    // Método para adicionar um professor, garantindo a atualização da relação bidirecional
    public void addProfessor(Professor professor) {
        if (professor != null && !professors.contains(professor)) {
            this.professors.add(professor);
            professor.getStudents().add(this); // Link bidirecional
        }
    }

    // Método para remover um professor, garantindo a atualização da relação bidirecional
    public void removeProfessor(Professor professor) {
        if (professor != null && professors.contains(professor)) {
            this.professors.remove(professor);
            professor.getStudents().remove(this);
        }
    }
    @ManyToMany
    @JoinTable(
            name = "skin_student",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "skin_id")
    )
    private Set<Skin> skins = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "title_student",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "title_id")
    )
    private Set<Title> titles = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "trophies_student",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "trophy_id")
    )
    private Set<Trophy> trophies = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "classroom_id")
    @JsonBackReference  // Evita que o "back" da relação seja serializado
    private ClassRoom classroom;

}
