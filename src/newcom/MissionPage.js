import React from 'react';



function MissionPage() {
    return (
        <div style={styles.pageContainer}>
           <main style={styles.mainContent}>
                <h1 style={styles.title}>Our Mission</h1>
                <p style={styles.description}><strong>Our mission</strong> at the <em>Chittagong University of Engineering and Technology (CUET) Transport Management App</em> is rooted in a commitment to enhancing the daily transit experience for students, faculty, and staff. We recognize that transportation is a critical component of campus life, impacting not only convenience but also safety, accessibility, and environmental sustainability. With this in mind, we are dedicated to creating a system that is reliable, efficient, and mindful of our planet.</p>
                <p style={styles.description}><strong>One of our primary objectives</strong> is to improve the efficiency of transportation services, ensuring that every student and staff member can rely on timely and comfortable commutes. We are actively working to streamline routes, reduce wait times, and offer real-time tracking, so that everyone can plan their journeys with confidence and minimal disruption.</p>
                <p style={styles.description}><strong>In alignment</strong> with global environmental goals, CUET is also exploring and introducing eco-friendly bus options. By transitioning to electric or hybrid vehicles, we aim to reduce our carbon footprint, promoting a cleaner, healthier campus environment. This shift is not only an investment in our community’s future but also a testament to CUET’s dedication to sustainability and innovation.</p>
                <p style={styles.description}><strong>Furthermore</strong>, we understand the importance of making transit information easily accessible. Our app is designed to provide a user-friendly platform where students and staff can access schedules, track buses in real time, receive alerts about delays, and stay informed about any changes to services. This digital approach enhances transparency and empowers users with the information they need, right at their fingertips.</p>
                <p style={styles.description}><strong>Our mission goes</strong> beyond simply managing transportation logistics; it is about building a community-oriented system that enhances the quality of life for all CUET members. We believe that by investing in modern, eco-conscious solutions, we can foster a culture of sustainability and innovation that will benefit generations to come. Through continuous improvement and feedback from our community, we are committed to evolving our transport services to meet the growing needs of CUET.</p>
            </main>
        </div>
    );
}


const styles = {

    pageContainer: {
        fontFamily: "'Arial', sans-serif",
        textAlign: 'center',
        color: '#333',
        padding: '20px',
    },
    mainContent: {
        padding: '30px 10px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        margin: '20px auto',
        maxWidth: '800px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '20px',
        color: '#004d99',
    },
    description: {
        fontSize: '1.1em',
        lineHeight: '1.6',
        color: '#333',
        textAlign: 'justify',
        marginBottom: '20px',
    },
    footer: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '8px',
    },
    footerText: {
        fontSize: '0.9em',
        margin: '0',
    },
};

export default MissionPage;
