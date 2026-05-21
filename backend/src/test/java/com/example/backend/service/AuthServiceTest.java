package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");
        mockUser.setEmail("john@example.com");
        mockUser.setPhone("03001234567");
        mockUser.setPassword("encodedPassword");
    }

    // --- REGISTER TESTS ---

    @Test
    void register_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(jwtUtil.generateToken(anyString())).thenReturn("mockToken");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mockToken", response.getToken());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_EmailAlreadyInUse_ThrowsException() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(true);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email already in use", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_PhoneAlreadyInUse_ThrowsException() {
        RegisterRequest request = new RegisterRequest();
        request.setPhone("03001234567");
        request.setPassword("password123");

        when(userRepository.existsByPhone("03001234567")).thenReturn(true);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Phone already in use", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    // --- LOGIN TESTS ---

    @Test
    void login_Success_WithEmail() {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("john@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("john@example.com")).thenReturn("mockToken");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mockToken", response.getToken());
    }

    @Test
    void login_UserNotFound_ThrowsException() {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("unknown@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login(request));
    }

    @Test
    void login_InvalidPassword_ThrowsException() {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("john@example.com");
        request.setPassword("wrongPassword");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid password", ex.getMessage());
    }

    // --- GET PROFILE TESTS ---

    @Test
    void getProfile_Success() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));

        UserDto dto = authService.getProfile("john@example.com");

        assertNotNull(dto);
        assertEquals("John", dto.getFirstName());
        assertEquals("john@example.com", dto.getEmail());
    }

    @Test
    void getProfile_UserNotFound_ThrowsException() {
        when(userRepository.findByEmail("none@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("none@example.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.getProfile("none@example.com"));
    }

    // --- CHANGE PASSWORD TESTS ---

    @Test
    void changePassword_Success() {
        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("oldPassword");
        request.setNewPassword("newPassword");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("oldPassword", "encodedPassword")).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("newEncodedPassword");

        assertDoesNotThrow(() -> authService.changePassword("john@example.com", request));
        verify(userRepository, times(1)).save(mockUser);
    }

    @Test
    void changePassword_WrongCurrentPassword_ThrowsException() {
        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("wrongPassword");
        request.setNewPassword("newPassword");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> authService.changePassword("john@example.com", request));
        assertEquals("Invalid current password", ex.getMessage());
        verify(userRepository, never()).save(any());
    }
}