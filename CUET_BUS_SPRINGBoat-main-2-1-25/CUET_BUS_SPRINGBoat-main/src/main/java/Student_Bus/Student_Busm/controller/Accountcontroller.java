package Student_Bus.Student_Busm.controller;
import Student_Bus.Student_Busm.entity.Account;

import Student_Bus.Student_Busm.entity.Bus;
import Student_Bus.Student_Busm.entity.BusStopage;
import Student_Bus.Student_Busm.repository.Accountrepository;
import Student_Bus.Student_Busm.repository.BusRepository;
import Student_Bus.Student_Busm.service.Accountservice;
import Student_Bus.Student_Busm.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;
import java.util.List; // Import this
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin("*")
public class Accountcontroller {

    private final Accountservice accountService;
    private final BusService busService;

    private final Accountrepository accountRepository;  // Injecting AccountRepository
    private final BusRepository busRepository;

    @PostMapping("/register")
    public Account createAccount(@RequestBody Account account) {
        return accountService.postaccount(account);
    }

    @PostMapping("/login")
    public Account login(@RequestBody Account loginData) {
        Account account = accountService.findByStudentIdAndPassword(loginData.getStudentId(), loginData.getPassword());
        if (account != null) {
            return account;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }
    // New endpoint to fetch all students
    @GetMapping
    public List<Account> getAllStudents() {
        return accountService.getAllAccounts();
    }

    @PutMapping("/assign-bus/{studentId}")
    public ResponseEntity<Account> assignBusToStudent(
            @PathVariable String studentId,
            @RequestParam String busName) {
        Optional<Account> accountOpt = accountService.getAccountById(studentId);
        Optional<Bus> busOpt = busService.getBusByName(busName);

        if (accountOpt.isPresent() && busOpt.isPresent()) {
            Account account = accountOpt.get();
            Bus bus = busOpt.get();

            // Check if seats are available
            if (bus.getOccupiedSeats() < bus.getTotalSeats()) {
                account.setBus(bus);
                bus.setOccupiedSeats(bus.getOccupiedSeats() + 1);

                accountService.saveAccount(account);
                busService.saveBus(bus); // Ensure both entities are saved

                return ResponseEntity.ok(account);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    /*@PutMapping("/assign-bus/{studentId}")
    public ResponseEntity<String> assignBusToStudent(@PathVariable String studentId, @RequestParam String busName) {
        Account student = accountRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Bus bus = busRepository.findById(busName)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        student.setBus(bus);
        accountRepository.save(student);

        return ResponseEntity.ok("Bus assigned successfully");
    }*/


}
    // Endpoint to get all buses






