package com.example.backend.service;

import com.example.backend.dto.ContactRequest;
import com.example.backend.entity.*;
import com.example.backend.repository.ContactRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.findByPhone(email)
                        .orElseThrow(() -> new RuntimeException("User not found")));
    }

    public Page<Contact> getContacts(String userEmail, int page, int size, String search) {
        User user = getUser(userEmail);
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        if (search != null && !search.isEmpty()) {
            return contactRepository.searchByUser(user, search, pageable);
        }
        return contactRepository.findByUser(user, pageable);
    }

    public Contact createContact(String userEmail, ContactRequest request) {
        User user = getUser(userEmail);
        Contact contact = new Contact();
        contact.setUser(user);
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setTitle(request.getTitle());

        if (request.getEmails() != null) {
            List<ContactEmail> emails = request.getEmails().stream().map(e -> {
                ContactEmail ce = new ContactEmail();
                ce.setContact(contact);
                ce.setEmail(e.getEmail());
                ce.setLabel(e.getLabel());
                return ce;
            }).collect(Collectors.toList());
            contact.setEmails(emails);
        }

        if (request.getPhones() != null) {
            List<ContactPhone> phones = request.getPhones().stream().map(p -> {
                ContactPhone cp = new ContactPhone();
                cp.setContact(contact);
                cp.setPhoneNumber(p.getPhoneNumber());
                cp.setLabel(p.getLabel());
                return cp;
            }).collect(Collectors.toList());
            contact.setPhones(phones);
        }

        return contactRepository.save(contact);
    }

    public Contact updateContact(String userEmail, Long contactId, ContactRequest request) {
        User user = getUser(userEmail);
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setTitle(request.getTitle());

        contact.getEmails().clear();
        if (request.getEmails() != null) {
            request.getEmails().forEach(e -> {
                ContactEmail ce = new ContactEmail();
                ce.setContact(contact);
                ce.setEmail(e.getEmail());
                ce.setLabel(e.getLabel());
                contact.getEmails().add(ce);
            });
        }

        contact.getPhones().clear();
        if (request.getPhones() != null) {
            request.getPhones().forEach(p -> {
                ContactPhone cp = new ContactPhone();
                cp.setContact(contact);
                cp.setPhoneNumber(p.getPhoneNumber());
                cp.setLabel(p.getLabel());
                contact.getPhones().add(cp);
            });
        }

        return contactRepository.save(contact);
    }

    public void deleteContact(String userEmail, Long contactId) {
        User user = getUser(userEmail);
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        contactRepository.delete(contact);
    }
}