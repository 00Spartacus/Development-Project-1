package Student_Bus.Student_Busm.controller;

import Student_Bus.Student_Busm.entity.Account;
import Student_Bus.Student_Busm.entity.BusStatus;
import Student_Bus.Student_Busm.entity.Driver;
import Student_Bus.Student_Busm.entity.Bus;
import Student_Bus.Student_Busm.service.Accountservice;
import Student_Bus.Student_Busm.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/buses")
//@CrossOrigin(origins = "http://localhost:3000")  // Allow CORS for this controller
@CrossOrigin("*")
public class BusController {
    private final Accountservice accountService; // Inject Account service


    @Autowired
    private BusService busService;

    public BusController(Accountservice accountService) {
        this.accountService = accountService;
    }
    //private final Accountservice accountService; // Inject Account service


    // Endpoint to add a new bus
    @PostMapping
    public Bus addBus(@RequestBody Bus bus) {
        return busService.addBus(bus);
    }

    // Endpoint to get all buses
    @GetMapping
    public List<Bus> getAllBuses() {
        return busService.getActiveBuses();
    }

    // Endpoint to get only active buses
    @GetMapping("/active")
    public List<Bus> getActiveBuses() {
        return busService.getActiveBuses();
    }

    @GetMapping("/inactive")
    public List<Bus> getINActiveBuses() {
        return busService.getINActiveBuses();
    }


    // Endpoint to get a bus by name (primary key)
    @GetMapping("/{name}")
    public Bus getBusByName(@PathVariable String name) {
        return busService.getBusByName(name)
                .orElseThrow(() -> new RuntimeException("Bus not found with name: " + name));
    }

    @PutMapping("/{name}/status")
    public Bus updateBusStatus(@PathVariable String name, @RequestParam BusStatus status) {
        return busService.updateBusStatus(name, status);
    }
    @GetMapping("/{busName}/occupied-seats")
    public ResponseEntity<Integer> getOccupiedSeats(@PathVariable String busName) {
        Integer occupiedSeats = busService.getOccupiedSeats(busName);
        if (occupiedSeats != null) {
            return ResponseEntity.ok(occupiedSeats); // Return the number of occupied seats
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if bus is not found
    }

    @PutMapping("/{busName}/updateStopage")
    public Bus updateBusStopage(@PathVariable String busName, @RequestParam String stopageName) {
        return busService.updateBusStopage(busName, stopageName);
    }
    @GetMapping("/{busName}/stopage")
    public ResponseEntity<String> getBusStopage(@PathVariable String busName) {
        try {
            String stopageName = busService.getStopageName(busName);
            return ResponseEntity.ok(stopageName);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus or stopage not found");
        }
    }


    // Endpoint to update bus direction
    @PutMapping("/{name}/direction")
    public Bus updateBusDirection(@PathVariable String name, @RequestParam String direction) {
        return busService.updateBusDirection(name, direction);
    }

    // Endpoint to assign a driver to a bus using the bus name
    @PutMapping("/{busName}/assign-driver/{driverId}")
    public Driver assignDriverToBus(@PathVariable String busName, @PathVariable String driverId) {
        return busService.assignDriverToBus(busName, driverId);
    }

    // Endpoint to fetch active buses with their drivers
    @GetMapping("/active-with-drivers")
    public List<Bus> getActiveBusesWithDrivers() {
        return busService.getActiveBusesWithDrivers();
    }
    @PutMapping("/reset-occupied-seats")
    public ResponseEntity<String> resetAllOccupiedSeats() {
        busService.resetAllOccupiedSeats();
        return ResponseEntity.ok("All buses' occupied seats have been reset to zero.");
    }

    // Endpoint to book a seat on a specific bus
    /*@PostMapping("/{busName}/book-seat")
    public Bus bookSeat(@PathVariable String busName, @RequestParam int seatNumber) {
        return busService.bookSeat(busName, seatNumber);
    }*/
    

    // Endpoint to get the status of the bus, including the booked seats
    /*@GetMapping("/{busName}")
    public ResponseEntity<?> getBusDetails(@PathVariable String busName) {
        Bus bus = busService.getBBusByName(busName);

        if (bus == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus not found");
        }

        return ResponseEntity.ok(bus); // Return bus details
    }*/

//    @GetMapping("/active")
//    public List<Bus> getActiveBuse() {
//        return busService.getActiveBuses();
//    }
}

//m
