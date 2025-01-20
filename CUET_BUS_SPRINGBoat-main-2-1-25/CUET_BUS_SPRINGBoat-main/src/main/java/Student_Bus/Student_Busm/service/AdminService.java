package Student_Bus.Student_Busm.service;

import Student_Bus.Student_Busm.entity.Admin;
import Student_Bus.Student_Busm.entity.Bus;
import Student_Bus.Student_Busm.repository.AdminRepository;
import Student_Bus.Student_Busm.repository.BusRepository;  // Import BusRepository
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BusRepository busRepository;  // Add BusRepository here

    // Register a new admin
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Admin login functionality
    public Admin login(String adminId, String password) {
        Optional<Admin> optionalAdmin = adminRepository.findByAdminIdAndPassword(adminId, password);

        if (optionalAdmin.isPresent()) {
            System.out.println("Admin found: " + optionalAdmin.get().getAdminId());
        } else {
            System.out.println("No admin found with given credentials");
        }

        return optionalAdmin.orElse(null);  // Return null if no admin is found
    }

    // Method to assign a bus to an admin
    public Admin assignBusToAdmin(String adminId, String busId) {
        // Find admin by ID
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));

        // Find bus by ID (use the busRepository)
        Bus bus = busRepository.findById(busId).orElseThrow(() -> new RuntimeException("Bus not found"));

        // Assign the admin to the bus
        bus.setAdmin(admin);  // Set the admin to the bus

        // Save the updated bus
        busRepository.save(bus);  // Save the bus with the updated admin assignment

        // Return the updated admin (or you can return the bus if needed)
        return admin;
    }

}
