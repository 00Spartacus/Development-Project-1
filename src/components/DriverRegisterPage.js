import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
//import { Link } from "react-router-dom";

// CUET logo
import "./DriverRegisterPage.css";

function DriverRegisterPage() {
    const [driverData, setDriverData] = useState({
        driverId: "",
        name: "",
        contactNo: "",
        email: "",
        password: "",
    });

    const[isHuman, setIsHuman] = React.useState(false); // State for checkbox
    const navigate = useNavigate(); // Initialize navigate
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDriverData({
            ...driverData,
            [name]: value,
        });
    }


    const handleCheckboxChange = () => {
        setIsHuman(!isHuman); // Toggle
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle driver registration
        if (!isHuman) {
            alert("Please confirm that you are not a robot.");
            return;
        }

        //console.log(driverData);
        // After registration, navigate to the driver profile or show success message
        // const driverData = {
        //     driverId: driverData.driverId,
        //     name: driverData.name,
        //     contactNo: driverData.contactNo,
        //     licenseNo: driverData.licenseNo,
        //     password: driverData.password,
        // };

        console.log("Registering driver:", driverData); // Log data to console
    
        try{
            const response = await fetch('http://localhost:8080/api/drivers/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(driverData),
        });
        if(response.ok){
            navigate('/driver-login');
        }
        else{
            const error = await response.json();
            alert(error.message||'An error occurred. Please try again later.');
        }
    } catch (err) {
        console.error("An error occurred:", err);
        alert("An error occurred. Please try again later.");
    }
};
return (
    <div className="driver-register-page">
        
       

        
        <form className="driver-register-form" onSubmit={handleSubmit}>
        <h3>Driver Registration</h3>    
            <input 
                type="text" 
                name="driverId" 
                placeholder="Driver ID" 
                value={driverData.driverId}
                onChange={handleInputChange}
                required 
            />
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={driverData.name}
                onChange={handleInputChange}
                required 
            />
            <input 
                type="text" 
                name="contactNo" 
                placeholder="Contact No" 
                value={driverData.contactNo}
                onChange={handleInputChange}
                required 
            />
            <input 
                type="text"
                name="licenseNo"
                placeholder="License No"
                value={driverData.licenseNo}
                onChange={handleInputChange}
                required
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={driverData.password}
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
export default DriverRegisterPage;
