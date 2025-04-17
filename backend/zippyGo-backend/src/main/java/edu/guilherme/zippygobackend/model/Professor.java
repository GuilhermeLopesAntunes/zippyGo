package edu.guilherme.zippygobackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "professors")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
public class Professor extends User {
    private String subject;

    @ManyToMany(mappedBy = "professors")
    private Set<Student> students = new HashSet<>();

    // Método para adicionar um aluno, garantindo a atualização da relação bidirecional
    public void addStudent(Student student) {
        if (student != null) {
            this.students.add(student);
            student.getProfessors().add(this);  // Link bidirecional, se necessário
        }
    }

    // Método para remover um aluno, garantindo a atualização da relação bidirecional
    public void removeStudent(Student student) {
        if (student != null) {
            this.students.remove(student);
            student.getProfessors().remove(this);
        }
    }
}