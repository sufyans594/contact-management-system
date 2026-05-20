package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "contact_phones")
@Getter
@Setter
public class ContactPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    @JsonIgnore
    private Contact contact;

    private String phoneNumber;
    private String label;
}