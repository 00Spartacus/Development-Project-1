import React, { useEffect, useState } from 'react';
import './BackgroundSlider.css'; // Ensure this CSS file exists

const BackgroundSlider = () => {
    const images = [
        '../assets/background1.jpg',
        '../assets/background2.jpg',
        '../assets/background3.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000); // Change image every second

        return () => clearInterval(interval); // Clear interval on unmount
    }, [images.length]);

    return (
        <div className="background-slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`background-image ${index === currentIndex ? 'fade' : ''}`}
                    style={{
                        backgroundImage: `url(${image})`,
                        opacity: index === currentIndex ? 1 : 0, // Fade in/out
                    }}
                ></div>
            ))}
        </div>
    );
};

export default BackgroundSlider; // This line exports the component as default
