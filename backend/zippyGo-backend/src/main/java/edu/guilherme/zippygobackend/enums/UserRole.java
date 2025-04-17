package edu.guilherme.zippygobackend.enums;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    STUDENT,
    PROFESSOR;

    @Override
    public String getAuthority() {
        return "ROLE_"+this.name(); //Padrão usando pelo Spring Security
    }
}
