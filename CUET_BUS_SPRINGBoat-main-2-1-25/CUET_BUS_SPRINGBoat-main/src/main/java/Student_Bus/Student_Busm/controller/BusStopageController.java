package Student_Bus.Student_Busm.controller;

import Student_Bus.Student_Busm.entity.Account;
import Student_Bus.Student_Busm.entity.BusStopage;
import Student_Bus.Student_Busm.service.Accountservice;
import Student_Bus.Student_Busm.service.BusStopageService;
import Student_Bus.Student_Busm.entity.StopageStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/busstopages")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BusStopageController {

    private final BusStopageService busStopageService;
    private final Accountservice accountService; // Inject Account service

    // Endpoint to add a new bus stopage
    @PostMapping
    public ResponseEntity<BusStopage> addBusStopage(@RequestBody BusStopage busStopage) {
        BusStopage createdStopage = busStopageService.addBusStopage(busStopage);
        return new ResponseEntity<>(createdStopage, HttpStatus.CREATED);
    }

    // Endpoint to retrieve all bus stopages
    @GetMapping
    public ResponseEntity<List<BusStopage>> getAllBusStopages() {
        List<BusStopage> stopages = busStopageService.getAllBusStopages();
        return new ResponseEntity<>(stopages, HttpStatus.OK);
    }

    // Endpoint to retrieve a specific bus stopage by name
    @GetMapping("/{stopageName}")
    public ResponseEntity<BusStopage> getStopageByName(@PathVariable String stopageName) {
        Optional<BusStopage> stopage = busStopageService.getStopageByName(stopageName);
        if (stopage.isPresent()) {
            return new ResponseEntity<>(stopage.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to update the status of a bus stopage
    @PutMapping("/{stopageName}/status")
    public ResponseEntity<BusStopage> updateStopageStatus(
            @PathVariable String stopageName,
            @RequestParam StopageStatus status) {
        BusStopage updatedStopage = busStopageService.updateStopageStatus(stopageName, status);
        return new ResponseEntity<>(updatedStopage, HttpStatus.OK);
    }

    // Endpoint to delete a bus stopage
    @DeleteMapping("/{stopageName}")
    public ResponseEntity<Void> deleteStopage(@PathVariable String stopageName) {
        busStopageService.deleteStopage(stopageName);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint to assign a bus stopage to a student
    @PutMapping("/assign/{studentId}")
    public ResponseEntity<Account> assignBusStopageToStudent(
            @PathVariable String studentId,
            @RequestParam String stopageName) {
        Optional<Account> accountOpt = accountService.getAccountById(studentId);
        Optional<BusStopage> busStopageOpt = busStopageService.getStopageByName(stopageName);

        if (accountOpt.isPresent() && busStopageOpt.isPresent()) {
            Account account = accountOpt.get();
            BusStopage busStopage = busStopageOpt.get();

            account.setBusStopage(busStopage); // Set the bus stopage
            Account updatedAccount = accountService.saveAccount(account); // Save the updated account

            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
