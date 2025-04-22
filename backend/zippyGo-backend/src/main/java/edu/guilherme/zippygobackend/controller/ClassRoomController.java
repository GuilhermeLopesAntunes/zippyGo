package edu.guilherme.zippygobackend.controller;


import edu.guilherme.zippygobackend.model.ClassRoom;
import edu.guilherme.zippygobackend.service.ClassRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classroom")
@RequiredArgsConstructor
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @GetMapping
    public List<ClassRoom> getAllClassRooms() {
        return classRoomService.findAll();
    }

    @PostMapping
    public ClassRoom createClassRoom(@RequestBody ClassRoom classRoom) {
        return classRoomService.save(classRoom);
    }

}
