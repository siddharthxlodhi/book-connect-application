package com.sid.book.auth;

import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = "First name is mandatory")
    @NotBlank(message = "First name is mandatory")
    private String firstName;
    @NotBlank(message = "Last name is mandatory")
    @NotEmpty(message = "Last name is mandatory")
    private String lastName;
    private LocalDate dateOfBirth;
    @Email(message = "Email is not formatted")
    @NotBlank(message = "Email is mandatory")
    @NotEmpty(message = "Email name is mandatory")
    private String email;
    @NotBlank(message = "Password is mandatory")
    @NotEmpty(message = "Password is mandatory")
    @Size(min = 8,message = "Password should have atleast 8 characters")
    private String password;
}
