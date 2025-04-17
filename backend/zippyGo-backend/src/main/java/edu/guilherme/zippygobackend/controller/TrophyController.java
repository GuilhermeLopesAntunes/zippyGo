package edu.guilherme.zippygobackend.controller;


import edu.guilherme.zippygobackend.model.Trophy;
import edu.guilherme.zippygobackend.service.TrophyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trophies")
@RequiredArgsConstructor
public class TrophyController {

    private final TrophyService trophyService;

    @GetMapping
    public List<Trophy> getAll() {
        return trophyService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trophy> getById(@PathVariable UUID id) {
        return trophyService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Trophy create(@RequestBody Trophy trophy) {
        return trophyService.create(trophy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trophy> update(@PathVariable UUID id, @RequestBody Trophy trophy) {
        return trophyService.update(id, trophy)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (trophyService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
