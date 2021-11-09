import React from 'react';
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
                backgroundColor: darkTheme ? '#333333' : '#eeeeee'
            }}>
                <div>
                <h1>Home {(user != null)?user.username:null} </h1>
                </div>
                
            </div>
            <Footer />
            
        </>
        );
}

export default Home;    