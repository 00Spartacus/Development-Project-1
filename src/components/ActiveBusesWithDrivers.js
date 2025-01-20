import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveBusesWithDrivers = () => {
    const [activeBuses, setActiveBuses] = useState([]);
    const [driversWithBus, setDriversWithBus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDriversWithBus = axios.get("http://localhost:8080/api/drivers/drivers-with-bus");
        const fetchActiveBuses = axios.get("http://localhost:8080/api/buses/active");

        Promise.all([fetchDriversWithBus, fetchActiveBuses])
            .then(([driversResponse, busesResponse]) => {
                setDriversWithBus(Array.isArray(driversResponse.data) ? driversResponse.data : []);
                setActiveBuses(Array.isArray(busesResponse.data) ? busesResponse.data : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again.");
                setLoading(false);
            });
    }, []);

    // Function to handle all operations
    const handleResetAll = async () => {
        try {
            // Unassign all drivers
            await axios.put("http://localhost:8080/api/drivers/unassign");
            
            // Reset occupied seats
            await axios.put("http://localhost:8080/api/buses/reset-occupied-seats");

            // Make all buses inactive
            await Promise.all(
                activeBuses.map((bus) =>
                    axios.put(`http://localhost:8080/api/buses/${bus.name}/status?status=INACTIVE`)
                )
            );

            console.log("All operations completed: Drivers unassigned, buses made inactive, and seats reset.");
        } catch (error) {
            console.error("Error handling reset operations:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Active Buses with Drivers</h1>
            <button
                onClick={handleResetAll}
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
            >
                Reset All: Unassign Drivers, Inactivate Buses & Reset Seats
            </button>

            {activeBuses.length > 0 ? (
                <>
                    <table
                        border="1"
                        cellPadding="10"
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>Bus Status</th>
                                <th>Occupied Seats</th>
                                <th>Total Seats</th>
                                <th>Stoppage Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeBuses.map((bus) => (
                                <tr key={bus.name}>
                                    <td>{bus.name}</td>
                                    <td>{bus.busStatus}</td>
                                    <td>{bus.occupiedSeats}</td>
                                    <td>{bus.totalSeats}</td>
                                    <td>{bus.stopage_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>Driver and Bus Information</h2>
                    {driversWithBus.length > 0 ? (
                        <table
                            border="1"
                            cellPadding="10"
                            style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                            <thead>
                                <tr>
                                    <th>Driver Name</th>
                                    <th>Bus Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {driversWithBus.map((driver) => (
                                    <tr key={driver.id}>
                                        <td>{driver.name}</td>
                                        <td>{driver.bus.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No driver and bus information available.</p>
                    )}
                </>
            ) : (
                <p>No active buses found.</p>
            )}
        </div>
    );
};

const styles = {
    button: {
        padding: "10px 20px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px",
    },
};

export default ActiveBusesWithDrivers;
