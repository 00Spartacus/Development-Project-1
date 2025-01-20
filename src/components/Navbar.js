import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img 
                    src="https://seeklogo.com/images/C/chittagong-university-of-engineering-and-technolog-logo-27727AB3FD-seeklogo.com.png" 
                    alt="CUET logo" 
                    className="logo" 
                />
                <div className="header-text">
                    <h1 className="university-name">Chittagong University of Engineering and Technology</h1>
                    <h2 className="app-title">CUET Transport Management App</h2>
                </div>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" exact activeClassName="active-link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bus-stopages" activeClassName="active-link">
                        Bus Stopages
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bus-seat-booking" activeClassName="active-link">
                        Seat Booking
                    </NavLink>
                </li>
                <li>
                <NavLink to="/contact" activeClassName="active-link">
                Contact Us       
                </NavLink>
                </li>
                <li>
                    <NavLink to="/feedback" activeClassName="active-link">
                    Feedback
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
