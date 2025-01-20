package Student_Bus.Student_Busm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "buses")
@Entity
public class Bus {

    @Id
    @Column(nullable = false, unique = true)
    private String name;  // Unique bus name (Primary Key)

    @ManyToOne
    @JoinColumn(name = "stopage_name", referencedColumnName = "stopageName")
    private BusStopage busStopage;  // Reference to BusStopage entity

    @Column(nullable = false)
    private int totalSeats = 50;  // Total seats in the bus

    @Column(nullable = false)
    private int occupiedSeats = 0;  // Occupied seats in the bus

    @Column(nullable = false)
    private String bustype;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusStatus busStatus = BusStatus.ACTIVE;  // Status of the bus

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Direction direction = Direction.FROM_CUET;  // Direction of the bus

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "adminId")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId")
    private Driver driver;


}
