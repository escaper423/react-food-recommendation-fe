import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PieChart from './PieChart';
//chart test
import {GoogleCharts} from 'google-charts';



const Contact = () => {
    localStorage.setItem("navIndex", 0);
    
    return (
        <>
            <Header />
            {}
            <Footer />
        </>
    )
}
export default Contact
