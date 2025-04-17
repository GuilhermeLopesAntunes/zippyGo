package edu.guilherme.zippygobackend.model;


import edu.guilherme.zippygobackend.enums.Rarity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class Skin {
    @Id
    @GeneratedValue
    private UUID id;
    private String skinName;
    private String skinDescription;
    private String image;
    private int price;
    private Rarity rarity;


}
