import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DriverLoginPage.css';
import Navbar from './Navbar'; 

function DriverLoginPage() {
    const navigate = useNavigate();

    const [driverId, setDriverId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/api/drivers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ driverId, password }),
            });
   
            if (response.ok) {
                const driverData = await response.json();
                navigate('/driver-profile', { state: { driver: driverData } });
            } else {
                setError("Invalid credentials");
                console.log("Response status:", response.status);
                console.log("Response message:", await response.text());
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Unable to log in. Please try again later.");
        }
    };

    return (
        <div className="driver-login-page">
            <div className='new_forml'>
                <h3>Driver Login</h3>
                <form className="driver-login-form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Driver ID" 
                        value={driverId} 
                        onChange={(e) => setDriverId(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <div className="register-section">
                    <p>New Driver?</p>
                    <button onClick={() => navigate('/driver-register')}>Register Here</button> {/* Ensure this path is correct */}
                </div>
            </div>
        </div>
    );
}

export default DriverLoginPage;
