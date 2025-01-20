import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';



function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="login-pagep">
            {/* Navbar Section */}
           

            {/* Header Section */}
               
            

            {/* Main Section */}
            <div className="main-contentp">
                <h3 className="identity-heading" style={{ fontWeight: 'bold', color: 'white', fontSize: '29px' }}>Choose Your Identity</h3>
                <div className="identity-options">
                    <button 
                        className="identity-button" 
                        onClick={() => navigate('/student-login')}
                    >
                        Student
                    </button>
                    <button 
                        className="identity-button" 
                        onClick={() => navigate('/admin-login')}
                    >
                        Bus Admin
                    </button>
                    <button 
                        className="identity-button" 
                        onClick={() => navigate('/driver-login')}
                    >
                        Bus Staff
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            
        </div>
    );
}

export default LoginPage;
