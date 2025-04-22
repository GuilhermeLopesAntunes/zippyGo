package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.*;
import edu.guilherme.zippygobackend.repository.*;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    private final SkinRepository skinRepository;
    private final TitleRepository titleRepository;
    private final TrophyRepository trophyRepository;
    private final ClassRoomRepository classRoomRepository;

    //private final ClassRoomRepository classRoomRepository;
    public void unlockSkin(UUID studentId, UUID skinId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                ()-> new RuntimeException("Estudante Não Encontrado")
        );
        Skin skin = skinRepository.findById(skinId).orElseThrow(
                ()-> new RuntimeException("Skin Não Encontrada")
        );

        student.getSkins().add(skin);
        studentRepository.save(student);
    }
    public void unlockTitles(UUID studentId, UUID titleId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                ()-> new RuntimeException("Estudante não encontrado")
        );
        Title title = titleRepository.findById(titleId).orElseThrow(
                ()-> new RuntimeException("Titulo Não encontrado")
        );

        student.getTitles().add(title);
        studentRepository.save(student);
    }

    public void unlockTrophies(UUID studentId, UUID trophyId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                ()-> new RuntimeException("Estudante não Encontrado")
        );
        Trophy trophy = trophyRepository.findById(trophyId).orElseThrow(
                ()-> new RuntimeException("Troféu Não Encontrado")
        );
        student.getTrophies().add(trophy);
        studentRepository.save(student);
    }

    public void linkStudentToClassRoom(UUID studentId, String classRoomId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                ()-> new RuntimeException("Aluno não encontrado")
        );
        System.out.println("Buscando sala com código: " + classRoomId);

        ClassRoom classroom = classRoomRepository.findByCode(classRoomId).orElseThrow(()->new RuntimeException("Sala nao encontrada"));



        classroom.addStudent(student);

        classRoomRepository.save(classroom);
        studentRepository.save(student);
    }

}
