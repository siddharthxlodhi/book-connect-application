package com.sid.book.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Token {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String activationToken;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

}
