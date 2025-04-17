package edu.guilherme.zippygobackend.service;

import edu.guilherme.zippygobackend.model.Skin;
import edu.guilherme.zippygobackend.repository.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SkinService {
    private final SkinRepository skinRepository;

    public List<Skin> findAll(){
        return skinRepository.findAll();
    }
    public Optional<Skin> getById(UUID id) {
        return skinRepository.findById(id);
    }

    public Skin create(Skin skin) {
        return skinRepository.save(skin);
    }

    public Optional<Skin> update(UUID id, Skin skin) {
        return skinRepository.findById(id).map(t->{
            t.setPrice(skin.getPrice());
            t.setRarity(skin.getRarity());
            t.setImage(skin.getImage());
            t.setSkinName(skin.getSkinName());
            t.setSkinDescription(skin.getSkinDescription());
            return skinRepository.save(t);
        });
    }

    public boolean delete(UUID id) {
        return skinRepository.findById(id).map(t->{
            skinRepository.delete(t);
            return true;
        }).orElse(false);
    }

}
