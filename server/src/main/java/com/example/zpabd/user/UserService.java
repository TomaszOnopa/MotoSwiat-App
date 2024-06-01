package com.example.zpabd.user;

import com.example.zpabd.config.JwtService;
import com.example.zpabd.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    public final static int USERS_PER_PAGE = 20;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) throws Exception {
        if (userRepository.existsByUsernameOrEmail(request.username(), request.email())) {
            throw new Exception("Istnieje już użytkownik o podanej nazwie lub adresie email");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .name(request.name())
                .surname(request.surname())
                .email(request.email())
                .role("USER")
                .build();
        userRepository.save(user);

        Map<String, Object> claims = new HashMap<>();
        claims.put("scope", "ROLE_" + user.getRole());
        return jwtService.generateToken(claims, user);
    }

    public String login(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        User user = userRepository.findByUsername(request.username()).orElseThrow();

        Map<String, Object> claims = new HashMap<>();
        claims.put("scope", "ROLE_" + user.getRole());
        return jwtService.generateToken(claims, user);
    }

    public Map<String, Object> getAllUsers(int pageNum) {
        Pageable paging = PageRequest.of(pageNum-1, USERS_PER_PAGE, Sort.by("username"));
        Page<User> page = userRepository.findAll(paging);

        return createPageData(page);
    }

    public Map<String, Object> getAllUsersByUsername(int pageNum, String username) {
        Pageable paging = PageRequest.of(pageNum-1, USERS_PER_PAGE, Sort.by("username"));
        Page<User> page = userRepository.findAllByUsernameContaining(username, paging);

        return createPageData(page);
    }

    @Transactional
    public boolean changeRole(UserRoleRequest request) {
        Optional<User> user = userRepository.findById(request.userId());
        if (user.isPresent()) {
            user.get().setRole(request.role());
            return true;
        }
        else
            return false;
    }

    private Map<String, Object> createPageData(Page<User> page) {
        List<UserRoleDto> users = page.getContent().stream().map(UserRoleDtoMapper::map).toList();

        Map<String, Object> result = new HashMap<>();

        result.put("users", users);
        result.put("totalItems", page.getTotalElements());
        result.put("totalPages", page.getTotalPages());

        return result;
    }
}
