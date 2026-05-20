package com.example.backend.controller;

import com.example.backend.dto.ContactRequest;
import com.example.backend.entity.Contact;
import com.example.backend.service.ContactService;
import com.example.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final JwtUtil jwtUtil;

    private String getEmailFromToken(String authHeader) {
        String token = authHeader.substring(7);
        return jwtUtil.extractUsername(token);
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getContacts(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        String email = getEmailFromToken(authHeader);
        return ResponseEntity.ok(contactService.getContacts(email, page, size, search));
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ContactRequest request) {
        String email = getEmailFromToken(authHeader);
        return ResponseEntity.ok(contactService.createContact(email, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody ContactRequest request) {
        String email = getEmailFromToken(authHeader);
        return ResponseEntity.ok(contactService.updateContact(email, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        String email = getEmailFromToken(authHeader);
        contactService.deleteContact(email, id);
        return ResponseEntity.noContent().build();
    }
}