package com.example.backend.service;

import com.example.backend.dto.ContactRequest;
import com.example.backend.entity.Contact;
import com.example.backend.entity.User;
import com.example.backend.repository.ContactRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ContactService contactService;

    private User mockUser;
    private Contact mockContact;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("john@example.com");

        mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setFirstName("Jane");
        mockContact.setLastName("Smith");
        mockContact.setUser(mockUser);
        mockContact.setEmails(new ArrayList<>());
        mockContact.setPhones(new ArrayList<>());
    }

    // --- GET CONTACTS TESTS ---

    @Test
    void getContacts_NoSearch_ReturnsPaginatedList() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        Page<Contact> mockPage = new PageImpl<>(List.of(mockContact));
        when(contactRepository.findByUser(any(User.class), any(Pageable.class))).thenReturn(mockPage);

        Page<Contact> result = contactService.getContacts("john@example.com", 0, 10, null);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(contactRepository, times(1)).findByUser(any(), any());
        verify(contactRepository, never()).searchByUser(any(), anyString(), any());
    }

    @Test
    void getContacts_WithSearch_CallsSearchMethod() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        Page<Contact> mockPage = new PageImpl<>(List.of(mockContact));
        when(contactRepository.searchByUser(any(User.class), anyString(), any(Pageable.class))).thenReturn(mockPage);

        Page<Contact> result = contactService.getContacts("john@example.com", 0, 10, "Jane");

        assertNotNull(result);
        verify(contactRepository, times(1)).searchByUser(any(), eq("Jane"), any());
        verify(contactRepository, never()).findByUser(any(), any());
    }

    @Test
    void getContacts_UserNotFound_ThrowsException() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> contactService.getContacts("unknown@example.com", 0, 10, null));
    }

    // --- CREATE CONTACT TESTS ---

    @Test
    void createContact_Success() {
        ContactRequest request = new ContactRequest();
        request.setFirstName("Jane");
        request.setLastName("Smith");
        request.setTitle("Engineer");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.save(any(Contact.class))).thenReturn(mockContact);

        Contact result = contactService.createContact("john@example.com", request);

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void createContact_UserNotFound_ThrowsException() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> contactService.createContact("unknown@example.com", new ContactRequest()));
    }

    // --- UPDATE CONTACT TESTS ---

    @Test
    void updateContact_Success() {
        ContactRequest request = new ContactRequest();
        request.setFirstName("Jane Updated");
        request.setLastName("Smith");
        request.setTitle("Senior Engineer");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(1L)).thenReturn(Optional.of(mockContact));
        when(contactRepository.save(any(Contact.class))).thenReturn(mockContact);

        Contact result = contactService.updateContact("john@example.com", 1L, request);

        assertNotNull(result);
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void updateContact_ContactNotFound_ThrowsException() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> contactService.updateContact("john@example.com", 99L, new ContactRequest()));
    }

    @Test
    void updateContact_Unauthorized_ThrowsException() {
        User otherUser = new User();
        otherUser.setId(2L);
        otherUser.setEmail("other@example.com");

        Contact otherContact = new Contact();
        otherContact.setId(1L);
        otherContact.setUser(otherUser);
        otherContact.setEmails(new ArrayList<>());
        otherContact.setPhones(new ArrayList<>());

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(1L)).thenReturn(Optional.of(otherContact));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> contactService.updateContact("john@example.com", 1L, new ContactRequest()));
        assertEquals("Unauthorized", ex.getMessage());
    }

    // --- DELETE CONTACT TESTS ---

    @Test
    void deleteContact_Success() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(1L)).thenReturn(Optional.of(mockContact));

        assertDoesNotThrow(() -> contactService.deleteContact("john@example.com", 1L));
        verify(contactRepository, times(1)).delete(mockContact);
    }

    @Test
    void deleteContact_ContactNotFound_ThrowsException() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> contactService.deleteContact("john@example.com", 99L));
        verify(contactRepository, never()).delete(any());
    }

    @Test
    void deleteContact_Unauthorized_ThrowsException() {
        User otherUser = new User();
        otherUser.setId(2L);

        Contact otherContact = new Contact();
        otherContact.setId(1L);
        otherContact.setUser(otherUser);

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(mockUser));
        when(contactRepository.findById(1L)).thenReturn(Optional.of(otherContact));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> contactService.deleteContact("john@example.com", 1L));
        assertEquals("Unauthorized", ex.getMessage());
        verify(contactRepository, never()).delete(any());
    }
}