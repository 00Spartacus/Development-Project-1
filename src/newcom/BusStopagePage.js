import React from 'react';
import './BusStopagePage.css';

const BusStopagePage = () => {
    // Define the unique bus stops with dynamic image URLs and descriptions
    const busStopages = [
        { name: 'Station', image: 'https://i.ibb.co.com/yWVT4hB/image.jpg', description: 'Old rail-station building.' },
        { name: 'Tigerpass', image: 'https://i.ibb.co.com/6bDm0zB/tigerpass.jpg', description: 'Popular bus stop for commuters.' },
        { name: 'Lalkhan Bazar', image: 'https://i.ibb.co.com/hZs0vRf/lalkhanbazar.jpg', description: 'Bazar area, busy with foot traffic.' },
        { name: 'GEC', image: 'https://i.ibb.co.com/94xN7WM/GEC-Circle.jpg', description: 'GEC-Cirle located near the General Electric company.' },
        { name: '2 No Gate', image: 'https://i.ibb.co.com/jZVqcwm/2no_gate.jpg', description: 'Second entry point to the campus.' },
        { name: 'Muradpur', image: 'https://i.ibb.co.com/n7p2vwc/muradpur.jpg', description: 'Residential area, well connected.' },
        { name: 'Bohodderhat', image: 'https://i.ibb.co.com/SndFrTH/maxresdefault.jpg', description: 'Famous junction for buses.' },
        { name: 'Rasther Matha Junction', image: 'https://i.ibb.co.com/3r0v6qr/rasthermatha.jpg', description: 'Located near the main street.' },
        { name: 'Quaish', image: 'https://i.ibb.co.com/9hCDJkw/Quaish.jpg', description: 'A developing neighborhood.' },
        { name: 'CUET', image: 'https://i.ibb.co.com/gt2zCYt/cuet.jpg', description: 'The main stop for CUET.' },
        // Route 2 stops
        { name: 'Badam Toli', image: 'https://i.ibb.co.com/W5RWYFy/badamtoli.jpg', description: 'Residential area.' },
        // { name: 'GC', image: 'https://example.com/images/gc.jpg', description: 'Known for its commercial area.' },
        { name: 'Oxygen', image: 'https://i.ibb.co.com/VTDmCVF/oxygen.jpg', description: 'Popular area for shopping.' },
        // { name: 'Ananya Abashik', image: 'https://example.com/images/ananya_abashik.jpg', description: 'Residential complex area.' },
        // { name: 'Khwaish', image: 'https://example.com/images/khwaish.jpg', description: 'A new residential area.' },
    ];

    return (
        <div className="bus-stopage-page">
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold' ,margin:'30px',color:'white'}}>Bus Stopages</h1>
            <p style={{textAlign: 'center', fontSize: '21px', fontWeight: 'bold' ,margin:'30px',color:'white'}}>Explore all the bus stops across different routes.</p>
            
            <div className="bus-stopages-container">
                {busStopages.map((stop, index) => (
                    <div key={index} className="bus-stopage-item">
                        <img src={stop.image} alt={stop.name} className="bus-stopage-image" />
                        <h3 className="bus-stopage-name" style={{color: 'white'}}>{stop.name}</h3>
                        <p className="bus-stopage-description" style={{color: 'white'}}>{stop.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusStopagePage;
