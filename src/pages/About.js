import React from 'react'
import Header from '../components/Header'

const About = () => {
    localStorage.setItem("navIndex", 0);
    return (
        <>
            <Header />
            <h1>About</h1>
        </>
    )
}

export default About
