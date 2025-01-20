import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [busAssignments, setBusAssignments] = useState([]); // Store assignments for each selected bus

  useEffect(() => {
    // Fetch buses, drivers, and routes from backend
    axios.get('http://localhost:8080/api/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error("Error fetching buses:", error));

    axios.get('http://localhost:8080/api/drivers')
      .then(response => setDrivers(response.data))
      .catch(error => console.error("Error fetching drivers:", error));

    axios.get('http://localhost:8080/api/routes')
      .then(response => setRoutes(response.data))
      .catch(error => console.error("Error fetching routes:", error));
  }, []);

  const handleAddBusAssignment = () => {
    // Add a new bus assignment entry with default values
    setBusAssignments([...busAssignments, { busId: "", driverId: "", routeId: "", timeSchedule: { startTime: "", bookingTime: "", reachAtStopage: "" } }]);
  };

  const handleBusAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...busAssignments];
    updatedAssignments[index][field] = value;
    setBusAssignments(updatedAssignments);
  };

  const handleTimeScheduleChange = (index, timeField, value) => {
    const updatedAssignments = [...busAssignments];
    updatedAssignments[index].timeSchedule[timeField] = value;
    setBusAssignments(updatedAssignments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting assignments:", busAssignments);
    // Submit the bus assignments to the backend
    axios.post('http://localhost:8080/api/assignments', busAssignments)
      .then(response => {
        console.log("Assignments saved:", response.data);
      })
      .catch(error => console.error("Error saving assignments:", error));
  };

  return (
    <div className="admin-page">
      <h1>Admin - Manage Bus Assignments</h1>

      <form onSubmit={handleSubmit}>
        {busAssignments.map((assignment, index) => (
          <div key={index} className="bus-assignment">
            <h3>Assignment {index + 1}</h3>
            
            {/* Select Bus */}
            <div className="form-group">
              <label>Select Bus</label>
              <select
                value={assignment.busId}
                onChange={(e) => handleBusAssignmentChange(index, 'busId', e.target.value)}
              >
                <option value="">Select a Bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>{bus.name}</option>
                ))}
              </select>
            </div>

            {/* Select Driver */}
            <div className="form-group">
              <label>Select Driver</label>
              <select
                value={assignment.driverId}
                onChange={(e) => handleBusAssignmentChange(index, 'driverId', e.target.value)}
              >
                <option value="">Select a Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
              </select>
            </div>

            {/* Select Route */}
            <div className="form-group">
              <label>Select Route</label>
              <select
                value={assignment.routeId}
                onChange={(e) => handleBusAssignmentChange(index, 'routeId', e.target.value)}
              >
                <option value="">Select a Route</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>{route.name}</option>
                ))}
              </select>
            </div>

            {/* Time Schedule */}
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={assignment.timeSchedule.startTime}
                onChange={(e) => handleTimeScheduleChange(index, 'startTime', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Booking Time</label>
              <input
                type="time"
                value={assignment.timeSchedule.bookingTime}
                onChange={(e) => handleTimeScheduleChange(index, 'bookingTime', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Reach at Stopage</label>
              <input
                type="time"
                value={assignment.timeSchedule.reachAtStopage}
                onChange={(e) => handleTimeScheduleChange(index, 'reachAtStopage', e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Add Bus Assignment Button */}
        <button type="button" onClick={handleAddBusAssignment}>Add Bus Assignment</button>

        {/* Submit Button */}
        <button type="submit">Submit Assignments</button>
      </form>
    </div>
  );
};

export default AdminPage;
