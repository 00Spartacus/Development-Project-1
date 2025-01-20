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

@Table(name = "bus_stopages")
@Entity
public class BusStopage {

    @Id
    private String stopageName; // Primary key for the stopage name

    @Column(nullable = false)
    private int busOrder; // Order of the bus stop in the route

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StopageStatus stopageStatus; // Status of the stopage (REACHED or NOT_REACHED)



}
