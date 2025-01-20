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

@Table(name = "students")
@Entity
public class Account {
    @Id
    private String studentId;          // Unique student identifier
    private String name;               // Student's full name
    private String department;         // Department name, e.g., "CSE"
    private String batch;              // Batch year, e.g., "2022"
    private String gender;             // Gender, e.g., "Male", "Female"
    //private String hall;               // Hall name, e.g., "Hall A"
    //private String bloodGroup;         // Blood group, e.g., "A+"
    private String contactNo;          // Contact number
    private String email;              // Email address
    private String password;           // Password (consider encrypting this in a real application)

    // Foreign Key to BusStopage entity
    @ManyToOne
    @JoinColumn(name = "stopageName") // This creates a foreign key in Account table
    private BusStopage busStopage;    // Reference to BusStopage

    // Foreign Key to Bus entity
    @ManyToOne
    @JoinColumn(name = "bus_name", referencedColumnName = "name") // References 'name' column in 'buses'
    private Bus bus; // Reference to the associated Bus

//    public void setAssignedBus(Bus bus) {
//    }
}
