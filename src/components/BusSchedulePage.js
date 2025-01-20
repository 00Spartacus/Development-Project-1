import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BusSchedulePage.css";

function BusSchedulePage() {
    const [buses, setBuses] = useState([]);
    const [busStopages, setBusStopages] = useState({});
    const [selectedBusStop, setSelectedBusStop] = useState("");
    const [isBusStopConfirmed, setIsBusStopConfirmed] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [selectedBusName, setSelectedBusName] = useState("");
    const [message, setMessage] = useState("");
    const [busStops, setBusStops] = useState([]);
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch logged-in student data from localStorage
        const storedData = localStorage.getItem("studentData");
        if (storedData) {
            setStudentData(JSON.parse(storedData));
        }

        // Fetch bus stops and active buses
        axios
            .get("http://localhost:8080/api/busstopages")
            .then((response) => setBusStops(response.data))
            .catch((error) => console.error("Error fetching bus stops:", error));

        axios
            .get("http://localhost:8080/api/buses/active")
            .then((response) => {
                const buses = Array.isArray(response.data) ? response.data : [];
                setBuses(buses);

                // Fetch stopage names for each bus
                buses.forEach(bus => {
                    axios.get(`http://localhost:8080/api/buses/${bus.name}/stopage`)
                        .then(response => {
                            setBusStopages(prevState => ({
                                ...prevState,
                                [bus.name]: response.data
                            }));
                        })
                        .catch(error => console.error(`Error fetching stopage for bus ${bus.name}:`, error));
                });
            })
            .catch((error) => console.error("Error fetching buses:", error));
    }, []);

    const handleBusStopChange = (event) => {
        setSelectedBusStop(event.target.value);
        setIsBusStopConfirmed(false); // Reset confirmation when selection changes
    };

    const handleBusChange = (event) => {
        setSelectedBusName(event.target.value);
    };

    const handleConfirmBusStop = () => {
        if (!selectedBusStop) {
            alert("Please select a bus stop to confirm!");
            return;
        }
        setIsBusStopConfirmed(true); // Confirm the selection
        alert(`Bus stop '${selectedBusStop}' confirmed.`);
    };

    const handleAssignBusStopToStudent = () => {
        if (!selectedBusStop || !isBusStopConfirmed || !studentData) {
            alert("Please confirm the bus stop!");
            return;
        }

        axios
            .put(
                `http://localhost:8080/api/busstopages/assign/${studentData.studentId}`,
                null,
                {
                    params: { stopageName: selectedBusStop },
                }
            )
            .then((response) => {
                alert(
                    `Bus stop '${selectedBusStop}' assigned to '${studentData.name}'.`
                );
            })
            .catch((error) => {
                console.error("Error assigning bus stop:", error);
                alert("Failed to assign the bus stop.");
            });
    };

    const handleAssignBusToStudent = async () => {
        if (!studentData || !selectedBusName) {
            alert("Please select a bus!");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/students/assign-bus/${studentData.studentId}`,
                null,
                { params: { busName: selectedBusName } }
            );
             // Save selected bus in localStorage
        localStorage.setItem("selectedBusName", selectedBusName);
            setMessage(response.data);
            alert(`Bus '${selectedBusName}' assigned to '${studentData.name}'.`);
        } catch (error) {
            setMessage(error.response?.data || "Error assigning bus");
            alert("Failed to assign the bus.");
        }
    };

    const handleBusSeatBooking = () => {
        navigate('/bus-seat-booking');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bus Schedule and Seat Booking</h1>

            {studentData && (
                <div style={styles.studentInfo}>
                    <p>
                        <strong>Logged-in Student:</strong> {studentData.name} (
                        {studentData.studentId})
                    </p>
                </div>
            )}

            <div style={styles.busStopSelection}>
                <label htmlFor="active-buses">Select Bus:</label>
                <select
                    id="active-buses"
                    value={selectedBusName}
                    onChange={handleBusChange}
                    style={styles.dropdown}
                >
                    <option value="">-- Select Bus --</option>
                    {buses.map((bus) => (
                        <option key={bus.name} value={bus.name}>
                            {bus.name}
                        </option>
                    ))}
                </select>
                <button
                    style={styles.assignButton}
                    onClick={handleAssignBusToStudent}
                >
                    Assign Bus to Logged-in Student
                </button>
                <button
                    style={styles.assignButton}
                    onClick={handleBusSeatBooking}
                >
                    Book Seat
                </button>
            </div>

            <div style={styles.busStopSelection}>
                <label htmlFor="bus-stop">Select Bus Stop:</label>
                <select
                    id="bus-stop"
                    value={selectedBusStop}
                    onChange={handleBusStopChange}
                    style={styles.dropdown}
                >
                    <option value="">-- Select Bus Stop --</option>
                    {busStops.map((busStop) => (
                        <option key={busStop.stopageName} value={busStop.stopageName}>
                            {busStop.stopageName}
                        </option>
                    ))}
                </select>
                <button
                    style={styles.confirmButton}
                    onClick={handleConfirmBusStop}
                >
                    Confirm Bus Stop
                </button>
            </div>

            <button
                style={styles.assignButton}
                onClick={handleAssignBusStopToStudent}
            >
                Assign to Logged-in Student
            </button>

            {/* Bus list display */}
            <div style={styles.busList}>
                {buses.map((bus) => (
                    <div
                        key={bus.name}
                        style={{
                            ...styles.busCard,
                            backgroundColor: bus.femaleOnly ? "#ffe6e6" : "#e6ffe6",
                        }}
                    >
                        <h3>{bus.name}</h3>
                        <p>Occupied Seats: {bus.occupiedSeats}</p>
                        <p>Booked: {bus.booked}</p>
                        <p>Vacant: {bus.totalSeats - bus.occupiedSeats}</p>
                        <p>Now At: {busStopages[bus.name] || "Loading..."}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    // Existing styles here
    confirmButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },

    assignButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    container: {
        border: '2px solid #333',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f2f5f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#333',
        fontWeight: 'bold',
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    busStopSelection: {
        marginBottom: '20px',
        textAlign: 'center',
        color: 'black',
    },
    dropdown: {
        fontSize: '16px',
        padding: '8px 16px',
        marginTop: '10px',
        width: '200px',
        color: 'black',
    },
    busStatus: {
        marginTop: '20px',
        textAlign: 'center',
    },
    statusTitle: {
        fontWeight: 'bold',
        color: '#444',
        fontSize: '28px',
        marginBottom: '10px',
    },
    busListTitle: {
        color: '#007bff',
        fontSize: '24px',
    },
    activeBusList: {
        fontWeight: 'bold',
        color: '#444',
        fontSize: '20px',
        marginBottom: '20px',
    },
    busList: {
        backgroundImage: 'url("https://wallpapercave.com/wp/wp9764031.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '2px solid black',
        borderRadius: '12px',
        shadow: '0px 6px 12px rgba(0, 0, 0, 3)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '10px',
        width: '90%',
        maxWidth: '1200px',
    },
    busCard: {
        backgroundColor: '#e6ffe6',
        border: '1px solid #333',
        width: '200px',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textTransform: 'capitalize',
    },
    detailText: {
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic',
    },
    buttonContainer: {
        display: 'flex',
        gap: '15px',
        marginTop: '20px',
    },
    backButton: {
        padding: '10px 20px',
        width: '100px',
        fontSize: '16px',
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    bookButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    studentSelection: {
        margin: "20px 0",
    },
    assignStudentButton: {
        marginLeft: "10px",
        padding: "10px 15px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },

};

export default BusSchedulePage;