package Student_Bus.Student_Busm.controller;

import Student_Bus.Student_Busm.entity.Bus;
import Student_Bus.Student_Busm.entity.Driver;
import Student_Bus.Student_Busm.repository.DriverRepository;
import Student_Bus.Student_Busm.service.Driverservice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;




@RestController
@RequestMapping("/api/drivers")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin("*")
public class DriverController {

    private final Driverservice driverService;
    private final DriverRepository driverRepository;
    public DriverController(Driverservice driverService, DriverRepository driverRepository) {
        this.driverService = driverService;
        this.driverRepository = driverRepository;
    }

    @PostMapping("/register")
    public Driver createDriver(@RequestBody Driver driver) {
        return driverService.postdriver(driver);
    }

    @GetMapping("/")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }
    @PostMapping("/{driverId}/assign-to-bus/{busName}")
    public ResponseEntity<String> assignDriverToBus(@PathVariable String driverId, @PathVariable String busName) {
        driverService.assignDriverToBus(driverId, busName);
        return ResponseEntity.ok("Driver assigned to bus successfully!");
    }


    @PostMapping("/login")
    public Driver login(@RequestBody Driver loginData) {
        Driver driver = driverService.findByDriverIdAndPassword(loginData.getDriverId(), loginData.getPassword());
        if (driver != null) {
            return driver;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @GetMapping("/drivers-without-bus")
    public List<Driver> getDriversWithoutBus() {
        return driverService.getDriversWithoutBus();
    }
    @GetMapping("/drivers-with-bus")
    public List<Driver> getDriversWithBus() {
        return driverService.getDriversWithBus();
    }



    @PutMapping("/unassign")
    public ResponseEntity<String> removeAllDriversFromBuses() {
        driverService.removeAllDriversFromBuses();
        return ResponseEntity.ok("All drivers have been removed from buses.");
    }

    @GetMapping("/{driverId}/assigned-bus")
    public ResponseEntity<Bus> getAssignedBus(@PathVariable String driverId) {
        Bus bus = driverService.findAssignedBus(driverId);
        if (bus != null) {
            return ResponseEntity.ok(bus);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if the driver or bus is not found
        }
    }


}

