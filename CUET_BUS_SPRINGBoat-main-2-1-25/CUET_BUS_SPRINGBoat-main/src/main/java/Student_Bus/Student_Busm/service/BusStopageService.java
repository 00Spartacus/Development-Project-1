package Student_Bus.Student_Busm.service;

import Student_Bus.Student_Busm.entity.Account;
import Student_Bus.Student_Busm.entity.BusStopage;
import Student_Bus.Student_Busm.entity.StopageStatus;
import Student_Bus.Student_Busm.repository.Accountrepository;
import Student_Bus.Student_Busm.repository.BusStopageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusStopageService {

    @Autowired
    private BusStopageRepository busStopageRepository;

    @Autowired
    private Accountrepository accountRepository;

    // Method to add a new bus stopage
    public BusStopage addBusStopage(BusStopage busStopage) {
        return busStopageRepository.save(busStopage);
    }

    // Method to retrieve all bus stopages
    public List<BusStopage> getAllBusStopages() {
        List<BusStopage> stopages = busStopageRepository.findAll();
        System.out.println("Fetched stopages: " + stopages); // Debug log
        return stopages;
    }


    // Method to find a stopage by name
    public Optional<BusStopage> getStopageByName(String stopageName) {
        return busStopageRepository.findById(stopageName);
    }

    // Method to update the status of a bus stopage
    public BusStopage updateStopageStatus(String stopageName, StopageStatus status) {
        BusStopage stopage = busStopageRepository.findById(stopageName)
                .orElseThrow(() -> new RuntimeException("Stopage not found with name: " + stopageName));
        stopage.setStopageStatus(status);
        return busStopageRepository.save(stopage);
    }

    // Method to delete a bus stopage
    public void deleteStopage(String stopageName) {
        busStopageRepository.deleteById(stopageName);
    }
    /*public Account assignBusStopToStudent(String studentId, String stopageName)
    {
        Account student = accountRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        BusStopage stopage = busStopageRepository.findById(stopageName)
                .orElseThrow(() -> new RuntimeException("Bus stopage not found with name: " + stopageName));

        student.setBusStopage(stopage);

        // Save and return the updated student
        return accountRepository.save(student);
    }*/

}
