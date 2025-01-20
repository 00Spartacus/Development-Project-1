import React from "react";
import './ContactUs.css';

const ContactUs = () => {
    const team = [
        {
            name: "Jahedul Islam",
            role: "Project Manager and Team Lead",
            email: "u2104003@student.cuet.ac.bd",
            phone: "+088-01700000000",
            
            image: "https://i.ibb.co/rsLW0tP/example.jpg",
        },
        {
            name: "Minhaj Ali Chowdhury",
            role: "Lead Developer and Backend Engineer",
            email: "u2104009@student.cuet.ac.bd",
            phone: "+088-01700000001",
            image: "https://i.ibb.co/MRTCTgw/example.jpg",
        },
        {
            name: "Priyangshu Barua",
            role: "UI/UX Designer and Database Engineer",
            email: "u2104033@student.cuet.ac.bd",
            phone: "+088-01700000002",
            image: "https://i.ibb.co/tmgpPpc/example.jpg",
        },
    ];

    return (
        <div className="contactus-container">
            <h2 className="page-title">Contact Us</h2>
            <div className="card-container">
                {team.map((person, index) => (
                    <div className="card" key={index}>
                        <img src={person.image} alt={`${person.name}`} className="card-image" />
                        <h3 className="card-name">{person.name}</h3>
                        <p className="card-role">{person.role}</p>
                        <p className="card-email">📧 {person.email}</p>
                        <p className="card-phone">📞 {person.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactUs;
