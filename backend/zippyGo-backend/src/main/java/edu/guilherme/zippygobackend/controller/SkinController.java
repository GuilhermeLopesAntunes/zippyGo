package edu.guilherme.zippygobackend.controller;


import edu.guilherme.zippygobackend.model.Skin;
import edu.guilherme.zippygobackend.service.SkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skins")
@RequiredArgsConstructor
public class SkinController {
    private final SkinService skinService;

    @GetMapping
    public List<Skin> findAll() {
        return skinService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skin> getById(@PathVariable UUID id) {
        return skinService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Skin create(@RequestBody Skin skin) {
        return skinService.create(skin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skin> update(@PathVariable UUID id, @RequestBody Skin skin) {
        return skinService.update(id, skin)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (skinService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

