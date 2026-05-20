package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ContactRequest {
    private String firstName;
    private String lastName;
    private String title;
    private List<EmailDto> emails;
    private List<PhoneDto> phones;

    @Data
    public static class EmailDto {
        private String email;
        private String label;
    }

    @Data
    public static class PhoneDto {
        private String phoneNumber;
        private String label;
    }
}