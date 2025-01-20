import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import './DriverProfilePage.css';

const DriverProfilePage = () => {
    const { driverId: urlDriverId } = useParams(); // Get the driverId from the URL parameters
    const location = useLocation();
    const driverData = location.state?.driver || {};
    const driverId = driverData.driverId || urlDriverId; // Use driverData.driverId if available, otherwise use urlDriverId
    const [busData, setBusData] = useState(null);
    const [busStops, setBusStops] = useState([]); // State for list of bus stops
    const [selectedStopage, setSelectedStopage] = useState(""); // State for the selected stopage
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    // Fetch assigned bus for the driver
    useEffect(() => {
        const fetchAssignedBus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/drivers/${driverId}/assigned-bus`);
                setBusData(response.data);
                setError(null); // Clear any previous error
            } catch (error) {
                setBusData(null);
                setError("Bus not found");
            }
        };

        if (driverId) {
            fetchAssignedBus();
        } else {
            setError("Driver ID is missing");
        }
    }, [driverId]);

    // Fetch list of bus stopages
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/busstopages")
            .then((response) => setBusStops(response.data))
            .catch((error) => console.error("Error fetching bus stops:", error));
    }, []);

    const handleUpdateStopage = async () => {
        if (!selectedStopage) {
            alert("Please select a valid stopage");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/buses/${busData.name}/updateStopage?stopageName=${selectedStopage}`);
            setUpdateSuccess("Stopage updated successfully");
            setError(null); // Clear error if update is successful
        } catch (error) {
            setUpdateSuccess(null);
            setError("Failed to update stopage");
        }
    };

    return (
        <div className="driver-profile-page">
            <h1>Driver Profile</h1>
            <div className="profile-container">
                <div className="profile-details">
                    <p>
                        <strong>Driver ID:</strong> {driverData.driverId}
                    </p>
                    <p>
                        <strong>Name:</strong> {driverData.name}
                    </p>
                    <p>
                        <strong>Contact No:</strong> {driverData.contactNo}
                    </p>
                    <p>
                        <strong>License No:</strong> {driverData.licenseNo}
                    </p>
                    <p>
                        <strong>Route ID:</strong> {driverData.routeId}
                    </p>
                    <p>
                        <strong>Assigned Bus:</strong> {busData ? busData.name : error || "Loading..."}
                    </p>
                    {busData && (
                        <div className="update-stopage-section">
                            <h3>Update Bus Stopage</h3>
                            <select
                                value={selectedStopage}
                                onChange={(e) => setSelectedStopage(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a stopage
                                </option>
                                {busStops.map((stop) => (
                                    <option key={stop.stopageName} value={stop.stopageName}>
                                        {stop.stopageName}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleUpdateStopage}>Update Stopage</button>
                            {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    )}
                    <button>
                        <Link to="/">← Back to Home</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverProfilePage;
