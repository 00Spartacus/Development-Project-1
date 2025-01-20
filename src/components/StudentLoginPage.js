import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLoginPage.css';



function StudentLoginPage() {
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/students/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, password }),
            });

            if (response.ok) {
                const studentData = await response.json();
                localStorage.setItem('studentData', JSON.stringify(studentData)); // Save data to localStorage
                navigate('/student-profile');
            } else {
                setError("Invalid Student ID or Password");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError("Unable to log in. Please try again later.");
        }
    
    };


    return (
        <div className="student-login-page">

            <div className="main-contents">
                <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '29px' }}>Student Login</h3>
                <form className="student-login-form" onSubmit={handleLogin}>
                    <input
                        type="text" placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
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
                </form>
                {error && <p className="error">{error}</p>}
                <div className="register-section">
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>New Student?</p>
                    <button onClick={() => navigate('/student-register')}>Register Here</button>
                </div>
            </div>
        </div>
    );
}

export default StudentLoginPage;
