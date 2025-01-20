package Student_Bus.Student_Busm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Student_Bus.Student_Busm.entity.Driver;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {

    List<Driver> findByBus_Name(String busName);
    //List<Driver> findByBusId(String busId);
    Optional<Driver> findByDriverIdAndPassword(String driverId, String password);
    List<Driver> findAll();

    List<Driver> findByBusIsNull();
    List<Driver> findByBusIsNotNull();
}


