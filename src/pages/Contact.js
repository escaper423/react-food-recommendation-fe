import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Contact = () => {
    localStorage.setItem("navIndex", 1);
    return (
        <>
            <Header />
            <div>
                <h1>Contact</h1>
            </div>
            <Footer />
        </>
    )
}

export default Contact
