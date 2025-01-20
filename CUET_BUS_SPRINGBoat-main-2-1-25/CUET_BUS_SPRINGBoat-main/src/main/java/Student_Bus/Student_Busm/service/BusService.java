package Student_Bus.Student_Busm.service;

import Student_Bus.Student_Busm.entity.*;
import Student_Bus.Student_Busm.repository.Accountrepository;
import Student_Bus.Student_Busm.repository.BusRepository;
import Student_Bus.Student_Busm.repository.BusStopageRepository;
import Student_Bus.Student_Busm.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private Accountrepository accountrepository;

    // Method to add a new bus
    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }
    public Bus saveBus(Bus bus) {
        return busRepository.save(bus); // Save or update the bus entity
    }

    // Method to retrieve all active buses
    public List<Bus> getActiveBuses() {
        return busRepository.findByBusStatus(BusStatus.ACTIVE);
    }

    public List<Bus> getINActiveBuses() {
        return busRepository.findByBusStatus(BusStatus.INACTIVE);
    }

    // Method to find a bus by its name (primary key)
    public Optional<Bus> getBusByName(String name) {
        return busRepository.findById(name);  // Find by 'name' as the primary key
    }

    public Bus getBBusByName(String name) {
        return busRepository.findById(name).orElseThrow(() -> new RuntimeException("Bus not found"));
    }

    // Method to update the bus status
    public Bus updateBusStatus(String name, BusStatus status) {
        Bus bus = busRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Bus not found with name: " + name));
        bus.setBusStatus(status);
        return busRepository.save(bus);
    }

    public Integer getOccupiedSeats(String busName) {
        Optional<Bus> bus = busRepository.findById(busName);
        return bus.map(Bus::getOccupiedSeats).orElse(null); // Return occupied seats or null if the bus is not found
    }

    @Autowired
    private BusStopageRepository busStopageRepository;

    public String getStopageName(String busName) {
        Bus bus = busRepository.findById(busName)
                .orElseThrow(() -> new NoSuchElementException("Bus not found"));

        // Assuming `busStopage` is the field for the BusStopage object in the Bus entity
        BusStopage stopage = bus.getBusStopage();
        if (stopage != null) {
            return stopage.getStopageName(); // Get the stopageName from the BusStopage object
        } else {
            throw new NoSuchElementException("Stopage not assigned to this bus");
        }
    }

    public Bus updateBusStopage(String busName, String stopageName) {
        // Find the bus by name
        Optional<Bus> optionalBus = busRepository.findById(busName);
        if (optionalBus.isEmpty()) {
            throw new IllegalArgumentException("Bus with name " + busName + " not found.");
        }

        // Find the stopage by name
        Optional<BusStopage> optionalStopage = busStopageRepository.findById(stopageName);
        if (optionalStopage.isEmpty()) {
            throw new IllegalArgumentException("BusStopage with name " + stopageName + " not found.");
        }

        // Update the stopage for the bus
        Bus bus = optionalBus.get();
        BusStopage busStopage = optionalStopage.get();
        bus.setBusStopage(busStopage);

        // Save and return the updated bus
        return busRepository.save(bus);
    }

    // Method to update the direction of a bus
    public Bus updateBusDirection(String name, String direction) {
        Bus bus = busRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Bus not found with name: " + name));
        bus.setDirection(Direction.valueOf(direction.toUpperCase()));
        return busRepository.save(bus);
    }

    public void resetAllOccupiedSeats() {
        List<Bus> buses = busRepository.findAll(); // Fetch all buses from the repository
        for (Bus bus : buses) {
            bus.setOccupiedSeats(0); // Set occupiedSeats to zero for each bus
            bus.setBusStopage(null);
        }
        busRepository.saveAll(buses); // Save the updated buses back to the repository
    }

    // Method to assign a driver to a bus using the bus name
    public Driver assignDriverToBus(String busName, String driverId) {
        Bus bus = busRepository.findById(busName)
                .orElseThrow(() -> new RuntimeException("Bus not found with name: " + busName));
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + driverId));

        // Assign the driver to the bus
        driver.setBus(bus);
        bus.setDriver(driver);

        // Set the bus status to ACTIVE
        bus.setBusStatus(BusStatus.ACTIVE);  // Set the bus status to ACTIVE when a driver is assigned

        // Save the updated driver and bus
        driverRepository.save(driver);
        return driverRepository.save(driver);  // Save the driver (this will automatically save the bus if the driver is assigned to the bus)
    }

    public List<Bus> getActiveBusesWithDrivers() {
        return busRepository.findByBusStatus(BusStatus.ACTIVE);
    }



    // Method to get buses for a specific admin
    public List<Bus> getBusesByAdmin(String adminId) {
        return busRepository.findByAdminAdminId(adminId);
    }





    // Get all buses
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }


}
