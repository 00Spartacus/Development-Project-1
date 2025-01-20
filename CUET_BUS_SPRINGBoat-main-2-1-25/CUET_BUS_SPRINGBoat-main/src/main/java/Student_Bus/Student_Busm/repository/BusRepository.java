// BusRepository.java
package Student_Bus.Student_Busm.repository;

import Student_Bus.Student_Busm.entity.Bus;
import Student_Bus.Student_Busm.entity.BusStatus;
import Student_Bus.Student_Busm.entity.BusStopage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends JpaRepository<Bus, String> {

    List<Bus> findByBusStatus(BusStatus busStatus);  // To find active buses

    // Custom query to get buses by admin ID if needed
    List<Bus> findByAdminAdminId(String adminId);  // Get all buses assigned to an admin
    //Optional<Bus> findByName(String name);
    //List<Bus> findByLocation(BusStopage location);

}
