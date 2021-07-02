import React from 'react';
import { UseDarkTheme } from '../ContextProvider';
import Header from '../Header';
import { Fragment } from 'react';

const Home = () => {
    const darkTheme = UseDarkTheme();

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
                <h1>Home</h1>
            </div>
        </>
        );
}

export default Home;    