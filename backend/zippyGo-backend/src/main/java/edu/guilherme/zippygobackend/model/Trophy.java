package edu.guilherme.zippygobackend.model;


import edu.guilherme.zippygobackend.enums.Rarity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Trophy {
    @Id
    @GeneratedValue
    UUID uuid;

    private String title;
    private String description;
    private String image;
    private int points;
    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    @ManyToMany(mappedBy = "trophies")
    private Set<Student> students = new HashSet<>();

}
