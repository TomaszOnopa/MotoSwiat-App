package com.example.zpabd.user;

import com.example.zpabd.user.dto.UserRoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    public final UserService userService;

    @GetMapping("/user-list")
    public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "1") int page) {
        try {
            return ResponseEntity.ok(userService.getAllUsers(page));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/user-list-by-username")
    public ResponseEntity<?> getAllUsersByTitle(@RequestParam(defaultValue = "1") int page, @RequestParam String username) {
        try {
            return ResponseEntity.ok(userService.getAllUsersByUsername(page, username));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/change-user-role")
    public ResponseEntity<?> changeUserRole(@RequestBody UserRoleRequest request) {
        try {
            if (userService.changeRole(request))
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
