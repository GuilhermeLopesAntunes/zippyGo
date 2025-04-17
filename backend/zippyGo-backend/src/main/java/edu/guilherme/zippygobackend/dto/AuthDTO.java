package edu.guilherme.zippygobackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


public record AuthDTO(String username, String password) {
}
