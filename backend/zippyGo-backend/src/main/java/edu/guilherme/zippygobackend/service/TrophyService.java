package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.Trophy;
import edu.guilherme.zippygobackend.repository.TrophyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrophyService {
    private final TrophyRepository trophyRepository;

    public List<Trophy> findAll() {
        return trophyRepository.findAll();
    }

    public Optional<Trophy> getById(UUID id) {
        return trophyRepository.findById(id);
    }

    public Trophy create(Trophy trophy) {
        return trophyRepository.save(trophy);
    }

    public Optional<Trophy> update(UUID id, Trophy updated) {
        return trophyRepository.findById(id).map(t -> {
            t.setTitle(updated.getTitle());
            t.setDescription(updated.getDescription());
            t.setImage(updated.getImage());
            t.setPoints(updated.getPoints());
            t.setRarity(updated.getRarity());
            return trophyRepository.save(t);
        });

    }

    public boolean delete(UUID id) {
        return trophyRepository.findById(id).map(t -> {
            trophyRepository.delete(t);
            return true;
        }).orElse(false);
    }
}
