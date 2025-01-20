// AdminLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';  // Import the CSS file for styling


function AdminLoginPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [adminId, setAdminId] = useState(''); // State for admin ID
    const [password, setPassword] = useState(''); // State for password
    const [error, setError] = useState(null); // State for error message

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // const loginData = {
        //     adminId,
        //     password,
        // };
    
        try {
            const response = await fetch('http://localhost:8080/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({adminId, password}),
            });
    
            if (response.ok) {
                 const adminData = await response.json();
                navigate('/admin-profile', { state: { admin: adminData } });
            } else {
                setError("Invalid credentials");
                console.log("Response status:", response.status);  // Log response status for debugging
                console.log("Response message:", await response.text()); // Log the response text
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Unable to log in. Please try again later.");
        }
    };
    
    return (
        <div className="admin-login-page">
          

            <div className='main-contents'>
            <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '29px' }}>Bus Admin Login</h3>
            <form className="admin-login-form" onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Admin ID" 
                    value={adminId} 
                    onChange={(e) => setAdminId(e.target.value)} 
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
                {error && <p className="error">{error}</p>} {/* Display error message if it exists */}
            </form>

            {/* <div className="register-section">
                <p>New Admin?</p>
                <button 
                    className="register-button" 
                    onClick={() => navigate('/admin-register')} // Navigate to the admin registration page
                >
                    Register Here
                </button>
            </div> */}
            </div>
        </div>
    );
}

export default AdminLoginPage;
