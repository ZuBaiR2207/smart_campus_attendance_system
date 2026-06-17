package com.zubiar.campusfest.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {
    private Long id;
    private String name;
    private String email;
    private String department;
    private LocalDateTime registeredAt;
    private String message;
}
