import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AssignDriverToBus.css';

const AssignDriverToBus = () => {
    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedBus, setSelectedBus] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");
    const [busStatus, setBusStatus] = useState("INACTIVE");
    const [assignments, setAssignments] = useState([]);
    const [busDirection, setBusDirection] = useState("TO_CUET");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/drivers/drivers-without-bus")
            .then(response => setDrivers(response.data))
            .catch(error => console.error("Error fetching drivers:", error));

        axios.get("http://localhost:8080/api/buses/inactive")
            .then(response => setBuses(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAssign = () => {
        if (selectedBus && selectedDriver) {
            setAssignments(prevAssignments => [
                ...prevAssignments,
                { bus: selectedBus, driver: selectedDriver, status: busStatus, direction: busDirection },
            ]);

            axios.put(`http://localhost:8080/api/buses/${selectedBus}/status`, null, { params: { status: busStatus } })
                .then(() => console.log(`Bus ${selectedBus} status updated to ${busStatus}`))
                .catch(error => console.error("Error updating bus status:", error));

            axios.put(`http://localhost:8080/api/buses/${selectedBus}/direction`, null, { params: { direction: busDirection } })
                .then(() => console.log(`Bus ${selectedBus} direction updated to ${busDirection}`))
                .catch(error => console.error("Error updating bus direction:", error));

            setSelectedBus("");
            setSelectedDriver("");
            setBusStatus("INACTIVE");
        } else {
            alert('Please select both a bus and a driver.');
        }
    };

    const handleSubmitAssignments = () => {
        assignments.forEach(assignment => {
            axios.post(`http://localhost:8080/api/drivers/${assignment.driver}/assign-to-bus/${assignment.bus}`)
                .then(() => alert("Driver assigned to bus successfully!"))
                .catch(error => console.error("Error assigning driver:", error));
        });

        setAssignments([]);
    };

    return (
        <div id="assign-driver-to-bus">
            <h1>Assign Driver to Bus</h1>
            <div className="form-group">
                <label>Select Bus: </label>
                <select value={selectedBus} onChange={e => setSelectedBus(e.target.value)} className="form-control">
                    <option value="">--Select Bus--</option>
                    {buses.map(bus => (
                        <option key={bus.name} value={bus.name}>{bus.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Select Driver: </label>
                <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} className="form-control">
                    <option value="">--Select Driver--</option>
                    {drivers.map(driver => (
                        <option key={driver.driverId} value={driver.driverId}>{driver.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Bus Direction: </label>
                <select value={busDirection} onChange={e => setBusDirection(e.target.value)} className="form-control">
                    <option value="TO_CUET">TO CUET</option>
                    <option value="FROM_CUET">FROM CUET</option>
                </select>
            </div>
            <div className="form-group">
                <label>Start Time: </label>
                <input type="time" min="09:00" max="18:00" required className="form-control" />
            </div>
            <div className="form-group">
                <label>Bus Status: </label>
                <select value={busStatus} onChange={e => setBusStatus(e.target.value)} className="form-control">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="UNDER_MAINTENANCE">UNDER MAINTENANCE</option>
                </select>
            </div>
            <button onClick={handleAssign} className="assign-button">Assign Driver</button>

            <h3>Assignments:</h3>
            <ul className="assignments-list">
                {assignments.map((assignment, index) => (
                    <li key={index} className="assignment-item">
                        Bus: {assignment.bus}, Driver: {assignment.driver}, Status: {assignment.status}, Direction: {assignment.direction}
                    </li>
                ))}
            </ul>

            {assignments.length > 0 && (
                <button onClick={handleSubmitAssignments} className="submit-button">Confirm All Assignments</button>
            )}
            <button onClick={() => navigate("/active-buses-drivers")} className="dashboard-button">Dashboard</button>
        </div>
    );
};

export default AssignDriverToBus;
