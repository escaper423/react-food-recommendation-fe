import React from 'react';
import { UseAuthUser, UseSetAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import Header from '../components/Header';
import axios from 'axios';

const Home = () => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const SetUser = UseSetAuthUser();

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                backgroundColor: darkTheme ? '#333333' : '#eeeeee'
            }}>
                <h1>Home {(user != null)?user.username:null} </h1>
                <div>
                </div>
                
            </div>
        </>
        );
}

export default Home;    