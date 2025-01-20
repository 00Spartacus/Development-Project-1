package Student_Bus.Student_Busm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    private String adminId;          // Unique admin identifier
    private String name;             // Admin's full name
    private String contactNo;        // Contact number
    private String email;            // Email address
    private String password;

    @Column(nullable = true)
    private String responcibility;   // can be null
}
