package se.pumarin.rideshare.auth;

import se.pumarin.rideshare.config.security.JwtTokenProvider;
import se.pumarin.rideshare.dto.LoginRequest;
import se.pumarin.rideshare.dto.RegisterRequest;
import se.pumarin.rideshare.dto.TokenResponse;
import se.pumarin.rideshare.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        userService.registerUser(req.getUsername(), req.getEmail(), req.getPassword());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var userDetails = userDetailsService.loadUserByUsername(req.getUsername());
        String token = jwtTokenProvider.generateToken(userDetails);
        return ResponseEntity.ok(new TokenResponse(token));
    }
}