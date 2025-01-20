import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            {/* Copyright */}
            <div style={copyRightStyle}>
                © 2024 Copyright: 
                <a style={linkStyle} href="https://mdbootstrap.com/"> CUET BUS Management</a>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#133644',
    color: '#ffffff',
    padding: '15px 0',
    position: 'relative', // Keeps the footer in place
    width: '100%',
    bottom: 0
};

const copyRightStyle = {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
};

const linkStyle = {
    color: '#d0b51a',
    textDecoration: 'none',
};

export default Footer;
