package edu.guilherme.zippygobackend.controller;

import edu.guilherme.zippygobackend.dto.ClassRoomIdRequest;
import edu.guilherme.zippygobackend.repository.StudentRepository;
import edu.guilherme.zippygobackend.service.StudentService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;


    @PostMapping("/{studentId}/unlock-skin/{skinId}")
    public ResponseEntity<String> unlockSkin(
            @PathVariable UUID studentId,
            @PathVariable UUID skinId
            ){
        studentService.unlockSkin(studentId, skinId);
        return ResponseEntity.ok("Unlocked skin");
    }

    @PostMapping("/{studentId}/unlock-title/{titleId}")
    public ResponseEntity<String> unlockTitle(
            @PathVariable UUID studentId,
            @PathVariable UUID titleId
    ){
        studentService.unlockTitles(studentId, titleId);
        return ResponseEntity.ok("Unlocked title");
    }

    @PostMapping("/{studentId}/unlock-trophy/{trophyId}")
    public ResponseEntity<String> unlockTrophy(
            @PathVariable UUID studentId,
            @PathVariable UUID trophyId
    ){
        studentService.unlockTrophies(studentId, trophyId);
        return ResponseEntity.ok("Unlocked trophy");
    }

    @PostMapping("/{studentId}/link-class")
    public ResponseEntity<String> linkClassRoom(@PathVariable UUID studentId, @RequestBody ClassRoomIdRequest request) {
        studentService.linkStudentToClassRoom(studentId,request.classRoomId());
        return ResponseEntity.ok("Linked class room");
    }
}
