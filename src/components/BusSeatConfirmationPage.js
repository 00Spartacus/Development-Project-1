import React, { useState, useEffect } from 'react';
//import './BusSeatConfirmationPage.css';
import './BusSeatBookingPage.css';

function BusSeatConfirmationPage() {
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer); // Cleanup interval on component unmount
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="confirmation-page">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src="path_to_logo" alt="CUET Logo" />
                </div>
                <h1>Chittagong University of Engineering and Technology</h1>
                <h2>CUET Transport Management App</h2>
            </header>

            {/* Sidebar Menu */}
            <nav className="sidebar">
                <ul>
                    <li>Home</li>
                    <li>Notice</li>
                    <li>Bus List</li>
                    <li>Our Mission</li>
                    <li>About</li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <h3 className="booking-window">Booking Window (Bus Name)</h3>
                <p>
                    Time for response ends in: <strong>{formatTime(timeLeft)}</strong>
                </p>

                {/* Seat Layout */}
                <div className="seat-layout">
                    <div className="seat-indicator">
                        <div className="occupied-seat">Occupied</div>
                        <div className="booked-seat">Booked</div>
                        <div className="vacant-seat">Vacant</div>
                    </div>

                    <div className="seats">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className={`seat ${i < 5 ? 'occupied' : i < 10 ? 'booked' : 'vacant'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="controls">
                    <button>Overcrowd</button>
                    <button>Emergency Stop</button>
                    <button>Next Stop</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div>Contact Us | Copyrights | <a href="facebook_link">Facebook</a></div>
                <div>Quick Links | <a href="qna_link">Q&A</a></div>
                <div>Information | Feedback</div>
            </footer>
        </div>
    );
}

export default BusSeatConfirmationPage;
