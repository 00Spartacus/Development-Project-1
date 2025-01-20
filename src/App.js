// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Homepage from './components/Homepage';  
import LoginPage from './components/LoginPage';  
import StudentLoginPage from './components/StudentLoginPage';  
import AdminLoginPage from './components/AdminLoginPage';  
import AdminProfilePage from './components/AdminProfilePage';
//import AdminProfilePage from './components/AdminProfilePage'; // Correct case
//import DriverLoginPage from './components/DriverLoginPage';
import DriverProfilePage from './components/DriverProfilePage'; // Import Driver Profile Page
import DriverRegisterPage from './components/DriverRegisterPage';
import DriverLoginPage from './components/DriverLoginPage';  
import StudentRegisterPage from './components/StudentRegisterPage';  
import AdminRegisterPage from './components/AdminRegisterPage';  
import StudentProfilePage from './components/StudentProfilePage';  
import BusSchedulePage from './components/BusSchedulePage'; // Import Bus Schedule Page
import MissionPage from './newcom/MissionPage';
import BusesPage from './newcom/BusesPage';
import NoticePage from './newcom/NoticePage';
import Footer from './components/Footer'; // Import Footer
import BusStopagePage from './newcom/BusStopagePage';  // Correct import path
import Navbar from './components/Navbar';
import AdminPage from './components/AdminPage'; // Import the AdminPage component
import BusSeatBookingPage from './components/BusSeatBookingPage';
import BusSeatConfirmationPage from './components/BusSeatConfirmationPage';
import './App.css';
import AssignDriverToBus from "./components/AssignDriverToBus";
import ActiveBusesWithDrivers from './components/ActiveBusesWithDrivers';
import ContactUs from './components/ContactUs';
import Feedback from './components/Feedback';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      {/* <div className="App" style={appStyle}>
      <div className="main-container" style={mainContainerStyle}> */}
        <Routes>
        <Route path="/active-buses-drivers" element={<ActiveBusesWithDrivers />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/assign-driver-to-bus" element={<AssignDriverToBus />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/notice" element={<NoticePage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="/driver-login" element={<DriverLoginPage />} />
          <Route path="/driver-profile" element={<DriverProfilePage />} />
          <Route path="/driver-register" element={<DriverRegisterPage />} />


          <Route path="/student-register" element={<StudentRegisterPage />} />
          <Route path="/admin-register" element={<AdminRegisterPage />} />
          <Route path="/student-profile" element={<StudentProfilePage />} /> {/* Ensure this route is correct */}
          <Route path="/bus-schedule" element={<BusSchedulePage />} /> {/* Route for Bus Schedule */}
          <Route path="/bus-stopages" element={<BusStopagePage />} /> {/* Simple path for all bus stops */}
          <Route path="/bus-seat-booking" element={<BusSeatBookingPage />} />
          <Route path="/bus-seat-confirmation" element={<BusSeatConfirmationPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
          

        </Routes>
        <Footer />
      {/* </div>
      </div> */}
    </Router>
    </div>
    
  );
}

// const appStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100vh', // Ensure the app fills the whole viewport
// };

// const mainContainerStyle = {
//   flex: 1, // Take up remaining space
// };

export default App;
