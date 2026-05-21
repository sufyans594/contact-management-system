package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        log.info("Registration attempt for email: {}", request.getEmail());

        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            log.warn("Registration failed - email already in use: {}", request.getEmail());
            throw new RuntimeException("Email already in use");
        }
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            log.warn("Registration failed - phone already in use: {}", request.getPhone());
            throw new RuntimeException("Phone already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        log.info("User registered successfully with email: {}", request.getEmail());

        String identifier = request.getEmail() != null ? request.getEmail() : request.getPhone();
        String token = jwtUtil.generateToken(identifier);
        return new AuthResponse(token, "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for identifier: {}", request.getIdentifier());

        User user = userRepository.findByEmail(request.getIdentifier())
                .orElseGet(() -> userRepository.findByPhone(request.getIdentifier())
                        .orElseThrow(() -> {
                            log.warn("Login failed - user not found for identifier: {}", request.getIdentifier());
                            return new RuntimeException("User not found");
                        }));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Login failed - invalid password for identifier: {}", request.getIdentifier());
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(request.getIdentifier());
        log.info("Login successful for identifier: {}", request.getIdentifier());
        return new AuthResponse(token, "Login successful");
    }

    public UserDto getProfile(String identifier) {
        log.info("Fetching profile for identifier: {}", identifier);

        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findByPhone(identifier)
                        .orElseThrow(() -> {
                            log.error("Profile fetch failed - user not found: {}", identifier);
                            return new RuntimeException("User not found");
                        }));

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        log.info("Profile fetched successfully for identifier: {}", identifier);
        return dto;
    }

    public void changePassword(String identifier, ChangePasswordRequest request) {
        log.info("Password change attempt for identifier: {}", identifier);

        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findByPhone(identifier)
                        .orElseThrow(() -> {
                            log.error("Password change failed - user not found: {}", identifier);
                            return new RuntimeException("User not found");
                        }));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            log.warn("Password change failed - incorrect current password for: {}", identifier);
            throw new RuntimeException("Invalid current password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("Password changed successfully for identifier: {}", identifier);
    }
}