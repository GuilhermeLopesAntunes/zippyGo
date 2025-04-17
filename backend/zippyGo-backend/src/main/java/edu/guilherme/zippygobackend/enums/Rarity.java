package edu.guilherme.zippygobackend.enums;

public enum Rarity {
    COMUM("Comum"),
    RARO("Raro"),
    EPICO("Épico"),
    LENDARIO("Lendário");

    private final String descricao;


    Rarity(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
