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
@Table( name="Feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Feedback_id;
    private String Text;
    private String Name;
    private String Email;
//    @ManyToOne
//    @JoinColumn(name = "account_id", referencedColumnName = "studentId")  // Foreign key to Admin
//    private Account account;

}
