import React from 'react';
import { UseAuthUser, UseSetAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import Header from '../components/Header';
import axios from 'axios';

const Home = () => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const SetUser = UseSetAuthUser();

    function TokenRefresh(){
        const {accessToken} = user;
        console.log(accessToken);
        axios({
            method: 'GET',
            headers: {'authorization': `Bearer ${accessToken}`},
            url: 'http://localhost:3001/refresh',
            withCredentials: true,
        }).then((res) => {
            SetUser({
                username: res.data.username,
                accessToken: res.data.accessToken
            });
            console.log(res);
        }).catch((err) => {
            console.log(err.response);
            SetUser(null);
        });
    }

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
                <button onClick={TokenRefresh}>Click me to refresh</button>
                </div>
                
            </div>
        </>
        );
}

export default Home;    