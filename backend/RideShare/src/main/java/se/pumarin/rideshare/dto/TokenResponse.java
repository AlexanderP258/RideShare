package se.pumarin.rideshare.dto;

import lombok.Data;

@Data
public class TokenResponse {
    private String token;
    public TokenResponse(String token) { this.token = token; }
    public String getToken() { return token; }
}