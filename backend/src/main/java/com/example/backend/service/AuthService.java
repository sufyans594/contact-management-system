package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String identifier = request.getEmail() != null ? request.getEmail() : request.getPhone();
        String token = jwtUtil.generateToken(identifier);
        return new AuthResponse(token, "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getIdentifier())
                .orElseGet(() -> userRepository.findByPhone(request.getIdentifier())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(request.getIdentifier());
        return new AuthResponse(token, "Login successful");
    }

    public UserDto getProfile(String identifier) {
        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findByPhone(identifier)
                        .orElseThrow(() -> new RuntimeException("User not found")));
        
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        return dto;
    }

    public void changePassword(String identifier, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findByPhone(identifier)
                        .orElseThrow(() -> new RuntimeException("User not found")));
        
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }
        
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}