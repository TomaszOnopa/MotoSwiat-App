package com.example.zpabd.user;

import com.example.zpabd.user.dto.AuthRequest;
import com.example.zpabd.user.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, userService.register(request)).build();
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, userService.login(request)).build();
    }
}
