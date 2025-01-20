import React, { useState } from 'react';
import axios from 'axios';
import './BusSeatBooking.css';

const BusSeatBookingPage = () => {
    const [seats, setSeats] = useState(
        Array.from({ length: 52 }, (_, index) => ({
            seatNo: index + 1,
            seatType: index % 2 === 0 ? 'Male' : 'Female',
            seatStatus: 'Vacant',
        }))
    );
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const BUS_NAME = 'Shurma'; // Fixed bus name
    const selectedBusName = localStorage.getItem("selectedBusName");
    const handleSeatClick = (seatNo) => {
        const seat = seats.find((s) => s.seatNo === seatNo);

        if (!seat) {
            setError('Invalid seat selected');
            return;
        }

        if (seat.seatStatus !== 'Vacant') {
            setError('This seat is not available');
            return;
        }

        setSelectedSeat(seatNo);
        setError('');
    };

    const validateBooking = () => {
        if (!selectedSeat) {
            setError('Please select a seat first');
            return false;
        }

        const studentData = JSON.parse(localStorage.getItem('studentData'));
        if (!studentData || !studentData.studentId) {
            setError('Please log in first');
            return false;
        }

        return true;
    };

    const handleBooking = async () => {
        if (!validateBooking()) return;

        setLoading(true);
        setError('');

        try {
            const studentData = JSON.parse(localStorage.getItem('studentData'));

            // Send request to the backend
            const response = await axios.post('http://localhost:8080/api/busSeats/assign', null, {
                params: {
                    busName: selectedBusName,
                    seatNo: selectedSeat,
                    studentId: studentData.studentId,
                },
            });

            // Update seat status locally
            setSeats((currentSeats) =>
                currentSeats.map((seat) =>
                    seat.seatNo === selectedSeat
                        ? { ...seat, seatStatus: 'Booked' }
                        : seat
                )
            );

            alert('Seat booked successfully!');
            setSelectedSeat(null);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to book seat. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-container">
            <h1>Bus Seat Booking</h1>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-message">Loading...</div>}

            <div className="legend">
                <div className="legend-item">
                    <span className="seat-demo vacant-male"></span>
                    <span>Male Seat</span>
                </div>
                <div className="legend-item">
                    <span className="seat-demo vacant-female"></span>
                    <span>Female Seat</span>
                </div>
                <div className="legend-item">
                    <span className="seat-demo booked"></span>
                    <span>Booked</span>
                </div>
            </div>

            <div className="bus-layout">
                <div className="driver-seat">🚍</div>
                <div className="seats-grid">
                    {seats.map((seat) => (
                        <div
                            key={seat.seatNo}
                            className={`seat 
                                ${seat.seatType.toLowerCase()} 
                                ${seat.seatStatus.toLowerCase()}
                                ${selectedSeat === seat.seatNo ? 'selected' : ''}
                            `}
                            onClick={() => handleSeatClick(seat.seatNo)}
                        >
                            {seat.seatNo}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="book-button"
                onClick={handleBooking}
                disabled={!selectedSeat || loading}
            >
                {loading ? 'Booking...' : 'Book Selected Seat'}
            </button>

            <div className="debug-info" style={{ marginTop: '20px' }}>
                <h3>Debug Information:</h3>
                <p>Selected Seat: {selectedSeat || 'None'}</p>
                <p>Student ID: {JSON.parse(localStorage.getItem('studentData'))?.studentId || 'Not logged in'}</p>
                <p>Bus Name: {selectedBusName}</p>
            </div>
                    <div className="student-data" style={{ marginTop: '20px' }}>
                        <h3>Student Data:</h3>
                        <pre>{JSON.stringify(JSON.parse(localStorage.getItem('studentData')), null, 2)}</pre>
                    </div>
        </div>
    );
};

export default BusSeatBookingPage;