import React from 'react';
import '../App.css';

const Footer = () => {
    return (
        <>
        <div className="footer">
        &copy; {new Date().getFullYear()} Dominique Fischer, HTWK Leipzig
        </div>
        </>
    )
}

export default Footer;