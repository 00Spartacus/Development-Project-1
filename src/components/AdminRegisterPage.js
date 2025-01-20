import React,{ useState } from "react";
import './AdminRegisterPage.css';  // Import the CSS for styling
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import logo from '../assets/cuet-logo.png';  // CUET logo
import Navbar from './Navbar'; 

function AdminRegisterPage() {
    const [admin, setAdmin] = useState({
        adminId: '',
        name: '',
        contactNo: '',
        email: '',
        password: '',
    });

    const[isHuman, setIsHuman] = useState(false); // State for checkbox
    const navigate = useNavigate(); // Initialize navigate
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmin({
            ...admin,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setIsHuman(!isHuman); // Toggle
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Add code to handle admin registration
        if (!isHuman) {
            alert("Please confirm that you are not a robot.");
            return;
        }

        //console.log(admin);
        // After registration, navigate to the admin profile or show success message
        const adminData = {
            adminId: admin.adminId,
            name: admin.name,
            contactNo: admin.contactNo,
            email: admin.email,
            password: admin.password,
        };

        console.log("Registering admin:", adminData); // Log data to console
    
        try{
            const response = await fetch('http://localhost:8080/api/admins/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        });
        if(response.ok){
            navigate('/admin-login');
        }
        else{
            const error = await response.json();
            alert(error.message||'An error occurred. Please try again later.');
        }
    }   catch (error) {
        console.error('Error registering admin:', error);
        alert("An error occurred. Please try again later.");    
    }
    
    };

    return (
        <div className="admin-register-page">
         <Navbar />  {/* Add this line to include the Navbar */}
            
            <h3>Admin Register</h3>
            <form className="admin-register-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="adminId" 
                    placeholder="Admin ID" 
                    value={admin.adminId} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={admin.name} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="contactNo" 
                    placeholder="Contact No" 
                    value={admin.contactNo} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={admin.email} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={admin.password} 
                    onChange={handleInputChange} 
                    required 
                />

                <div className="captcha-section">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isHuman} 
                            onChange={handleCheckboxChange} 
                        />
                        I'm not a robot
                    </label>
                </div>


                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default AdminRegisterPage;