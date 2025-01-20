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
@Table(name = "drivers")
public class Driver {

    @Id
    private String driverId;          // Unique driver identifier

    private String name;              // Driver's full name
    private String contactNo;         // Contact number     // Email address
    private String password;

    // Many-to-One relationship with Bus (Each driver is assigned to only one bus)
    @ManyToOne
    @JoinColumn(name = "bus_name", referencedColumnName = "name")  // Foreign key to Bus (name is the primary key in Bus)
    private Bus bus;  // The bus assigned to this driver
}
