package edu.guilherme.zippygobackend.security;

import edu.guilherme.zippygobackend.enums.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Service
public class TokenService {
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 6; // 6 horas
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String username, UserRole roles){
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles) // Inclui as roles no payload
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String getUsernameFromToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Verifica se a claim "roles" está presente e se é uma lista
        Object rolesObj = claims.get("roles");
        if (rolesObj instanceof List<?>) {
            return (List<String>) rolesObj;
        }

        return null; // Ou você pode lançar uma exceção caso não seja uma lista válida
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token); // Se a análise for bem-sucedida, o token é válido
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Se o token for inválido ou expirado, lança uma exceção
            return false;
        }
    }
}
