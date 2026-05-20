package com.example.backend.repository;

import com.example.backend.entity.Contact;
import com.example.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    Page<Contact> findByUser(User user, Pageable pageable);

    @Query("SELECT c FROM Contact c WHERE c.user = :user AND " +
           "(LOWER(c.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Contact> searchByUser(@Param("user") User user, @Param("search") String search, Pageable pageable);
}