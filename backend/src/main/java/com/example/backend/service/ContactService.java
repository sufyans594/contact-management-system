package com.example.backend.service;

import com.example.backend.dto.ContactRequest;
import com.example.backend.entity.*;
import com.example.backend.repository.ContactRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        log.debug("Looking up user by identifier: {}", email);
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.findByPhone(email)
                        .orElseThrow(() -> {
                            log.error("User not found for identifier: {}", email);
                            return new RuntimeException("User not found");
                        }));
    }

    public Page<Contact> getContacts(String userEmail, int page, int size, String search) {
        log.info("Fetching contacts for user: {}, page: {}, size: {}, search: {}", userEmail, page, size, search);
        User user = getUser(userEmail);
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        if (search != null && !search.isEmpty()) {
            log.debug("Searching contacts with keyword: {}", search);
            return contactRepository.searchByUser(user, search, pageable);
        }
        return contactRepository.findByUser(user, pageable);
    }

    public Contact createContact(String userEmail, ContactRequest request) {
        log.info("Creating contact for user: {}, name: {} {}", userEmail, request.getFirstName(), request.getLastName());
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
            log.debug("Added {} email(s) to contact", emails.size());
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
            log.debug("Added {} phone(s) to contact", phones.size());
        }

        Contact saved = contactRepository.save(contact);
        log.info("Contact created successfully with id: {}", saved.getId());
        return saved;
    }

    public Contact updateContact(String userEmail, Long contactId, ContactRequest request) {
        log.info("Updating contact id: {} for user: {}", contactId, userEmail);
        User user = getUser(userEmail);
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> {
                    log.warn("Update failed - contact not found with id: {}", contactId);
                    return new RuntimeException("Contact not found");
                });

        if (!contact.getUser().getId().equals(user.getId())) {
            log.warn("Unauthorized update attempt on contact id: {} by user: {}", contactId, userEmail);
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

        Contact updated = contactRepository.save(contact);
        log.info("Contact id: {} updated successfully", contactId);
        return updated;
    }

    public void deleteContact(String userEmail, Long contactId) {
        log.info("Deleting contact id: {} for user: {}", contactId, userEmail);
        User user = getUser(userEmail);
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> {
                    log.warn("Delete failed - contact not found with id: {}", contactId);
                    return new RuntimeException("Contact not found");
                });

        if (!contact.getUser().getId().equals(user.getId())) {
            log.warn("Unauthorized delete attempt on contact id: {} by user: {}", contactId, userEmail);
            throw new RuntimeException("Unauthorized");
        }

        contactRepository.delete(contact);
        log.info("Contact id: {} deleted successfully", contactId);
    }
}