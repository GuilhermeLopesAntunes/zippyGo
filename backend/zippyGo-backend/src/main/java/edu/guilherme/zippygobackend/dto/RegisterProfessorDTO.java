package edu.guilherme.zippygobackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.guilherme.zippygobackend.config.UniqueEmail;
import edu.guilherme.zippygobackend.config.UniqueUsername;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record RegisterProfessorDTO(
        @NotNull(message = "O nome é obrigatório")
        @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres.")
        String name,
        @NotNull(message = "O apelido é obrigatório")
        @Size(min = 3, max = 20, message = "O nome de usuário deve ter entre 3 e 20 caracteres.")
        @UniqueUsername
        String username,
        @NotNull(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres.")
        String password,
        @NotNull(message = "O email é obrigatório")
        @Email(message = "O e-mail deve ser válido.")
        @UniqueEmail
        String email,
        @NotNull(message = "A disciplina é obirgatória")
        String subject
) {
}
