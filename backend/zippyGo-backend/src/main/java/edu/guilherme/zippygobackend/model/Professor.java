package edu.guilherme.zippygobackend.model;

import jakarta.persistence.*;
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

    @ManyToMany
    @JoinTable(
            name = "professor_student",
            joinColumns = @JoinColumn(name = "professor_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> students = new HashSet<>();

    public void addStudent(Student student) {
        if (student != null && !students.contains(student)) {
            this.students.add(student);
            student.getProfessors().add(this); // Garantir que o relacionamento bidirecional seja mantido
        }
    }

    public void removeStudent(Student student) {
        if (student != null && students.contains(student)) {
            this.students.remove(student);
            student.getProfessors().remove(this);
        }
    }

    public void addClassRoom(ClassRoom classRoom) {
        if(classRoom != null && !classrooms.contains(classRoom)) {
            this.classrooms.add(classRoom);
            classRoom.getProfessors().add(this);
        }
    }
    public void removeClassRoom(ClassRoom classRoom) {
        if(classRoom != null && !classrooms.contains(classRoom)) {
            this.classrooms.remove(classRoom);
            classRoom.getProfessors().remove(this);
        }
    }

    @ManyToMany
    @JoinTable(
            name = "professor_classroom",
            joinColumns = @JoinColumn(name = "professor_id"),
            inverseJoinColumns = @JoinColumn(name = "classroom_id")

    )
    private Set<ClassRoom> classrooms = new HashSet<>();
}
