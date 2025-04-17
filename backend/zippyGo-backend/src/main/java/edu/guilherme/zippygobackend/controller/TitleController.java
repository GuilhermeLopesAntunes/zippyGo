package edu.guilherme.zippygobackend.controller;



import edu.guilherme.zippygobackend.model.Title;
import edu.guilherme.zippygobackend.service.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/titles")
@RequiredArgsConstructor
public class TitleController {
    private final TitleService titleService;

    @GetMapping
    public List<Title> findAll() {
        return titleService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Title> getById(@PathVariable  UUID id) {
        return titleService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Title create(@RequestBody Title title) {
        return titleService.create(title);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Title> update(@PathVariable UUID id, @RequestBody Title title) {
        return titleService.update(id, title)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (titleService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
