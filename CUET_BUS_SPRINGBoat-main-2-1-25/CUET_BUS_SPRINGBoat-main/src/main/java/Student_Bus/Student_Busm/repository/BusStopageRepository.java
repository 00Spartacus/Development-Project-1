package Student_Bus.Student_Busm.repository;

import Student_Bus.Student_Busm.entity.BusStopage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusStopageRepository extends JpaRepository<BusStopage, String> {
    //Optional<BusStopage> findByStopageName(String stopageName);

}
