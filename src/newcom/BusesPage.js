import React from 'react';
import './BusList.css';  // Create and import the CSS file for styling

const BusesPage = () => {
    // Define the bus details with dynamic image URLs, seat numbers, and descriptions
    const buses = [
        { name: 'Gomathi', image: 'https://i.ibb.co.com/2kdpZsX/image.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Madhumati', image: 'https://i.ibb.co.com/9qxNM78/image.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Halda', image: 'https://i.ibb.co.com/dKG6WfV/image.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Ichamati', image: 'https://i.ibb.co/8bB7gz2/Echamoti.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Surma', image: 'https://i.ibb.co.com/9284tv7/Madhumati.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Jamuna', image: 'https://i.ibb.co.com/61qQgHZ/Jamuna.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Padma', image: 'https://i.ibb.co.com/7NSCp2p/2.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Tista', image: 'https://i.ibb.co.com/thDjKj8/image.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Turag', image:'https://i.ibb.co/7jSDXSr/Turag.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Matamuhuri', image: 'https://i.ibb.co/0XndYDk/Madhumati.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Bhuri Ganga', image: 'https://i.ibb.co.com/nbwHtVq/image.jpg', seatNumber: 50, busType: 'Student' },
        { name: 'Rupasha', image: 'https://i.ibb.co/ZThyP2q/2.jpg', seatNumber: 50, busType: 'Teacher' },
        { name: 'Sangu', image: 'https://i.ibb.co.com/9284tv7/Madhumati.jpg', seatNumber: 50, busType: 'Female' }
        
        
    ];

    return (
        <div className="buses-page">
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold' ,margin:'30px',color:'White'}}>Buses</h1>
            <p style={{textAlign: 'center', fontSize: '21px', fontWeight: 'bold' ,margin:'30px',color:'White'}}>Explore all the buses and their details.</p>

            <div className="buses-container">
                {buses.map((bus, index) => (
                    <div key={index} className="bus-item">
                        <img src={bus.image} alt={bus.name} className="bus-image" />
                        <div className='bus_info'>
                            <h3 className="bus-name">{bus.name}</h3>
                            <p className="bus-seat-number">Seats: {bus.seatNumber}</p>
                            <p className="bus-type">Bus Type: {bus.busType}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusesPage;