package Student_Bus.Student_Busm.repository;

import Student_Bus.Student_Busm.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByAdminIdAndPassword(String adminId, String password);
}
