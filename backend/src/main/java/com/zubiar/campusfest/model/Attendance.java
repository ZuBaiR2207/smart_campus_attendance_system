package com.zubiar.campusfest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String email;

	private String department; // optional

	@Column(name = "registered_at")
	private LocalDateTime registeredAt;

	@PrePersist
	protected void onCreate() {
		registeredAt = LocalDateTime.now();
	}
}