package edu.guilherme.zippygobackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


public record LoginDTO(String username, String password) { }
