package edu.guilherme.zippygobackend.service;


import edu.guilherme.zippygobackend.model.Title;
import edu.guilherme.zippygobackend.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TitleService {

    private final TitleRepository titleRepository;


    public List<Title> getAll(){
        return titleRepository.findAll();
    }

    public Optional<Title> getById(UUID id){
        return titleRepository.findById(id);
    }

    public Title create(Title title){
        return titleRepository.save(title);
    }

    public Optional<Title> update(UUID id, Title title){
        return titleRepository.findById(id).map(t->{
            t.setTitleName(title.getTitleName());
            t.setRarity(title.getRarity());
            t.setPrice(title.getPrice());
            return titleRepository.save(t);
        });
    }

    public boolean delete(UUID id){
        return titleRepository.findById(id).map(t->{
            titleRepository.delete(t);
            return true;
        }).orElse(false);
    }
}
