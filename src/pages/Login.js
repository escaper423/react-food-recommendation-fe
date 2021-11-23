import React, { useState, useEffect } from 'react';
import { UseDarkTheme, UseSetAuthUser } from '../resources/ContextProvider';
import styled from 'styled-components';
import { confirmWrapperStyle,inputWrapperStyle,
    FlexScreenWrapper, InputBox, ConfirmButton, ForgetPasswordText } from '../resources/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginModal = styled.div`
        position: relative;
        width: 450px;
        height: 260px;
        margin: auto;
        padding: 10px;
        background-color: ${props => props.darkTheme ? '#444' : '#ddd'};
        color: ${props => props.darkTheme ? '#ddd' : '#333'};
        border-radius: 6px;
        box-shadow: ${props => props.darkTheme ? '1px 1px 8px 2px white' : '1px 1px 8px 2px black'};
    `

const Login = () => {
    const remem = localStorage.getItem('rememberState');
    const rememberState = (remem === "true")?true:false;
    const name = rememberState?localStorage.getItem('rememberName'):"";

    const [username, setUsername] = useState(name);
    const [password, setPassword] = useState("");
    const [rememberName, SetRememberName] = useState(rememberState);

    const darkTheme = UseDarkTheme();
    const navigate = useNavigate();

    const setAuthUser = UseSetAuthUser();
    useEffect(() => {
        localStorage.setItem('rememberState', rememberName);
    },[rememberName]);

    const LoginUser = (e) => {
        e.preventDefault();
        //dispatch login process
        let msg = document.querySelector('.app-login__message');
       
        console.log("Logging in...");
        axios({
            method: 'POST',
            url: 'http://localhost:3001/login',
            withCredentials: true,
            credentials: 'include',
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            //login succeed.
            console.log("Login success.");
            console.log(res.data);
            localStorage.setItem('rememberName',(rememberName)?username:"");
            localStorage.setItem('rememberState',rememberName);
            setAuthUser(
                {
                    username: res.data.username,
                    accessToken: res.data.accessToken
                });
            console.log("Logged in");
            navigate('/');
        }).catch(err =>{
            //login failed
            console.log(err.response);
            if (err.response)
                msg.innerHTML = err.response.data;
            else
                msg.innerHTML = "Failed to connect."
        });
    }

    const handleUsername = (e) => {
        return setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        return setPassword(e.target.value);
    }

    const toggleRemember = () => {
        SetRememberName(prev => !prev)
    }
    
    return (
        <form onSubmit={LoginUser}> 
            <FlexScreenWrapper darkTheme={darkTheme}>
                <LoginModal darkTheme={darkTheme}>
                    <h1 style={{ paddingTop: '10px', paddingBottom: '14px' }}>Login</h1>
                    <div className="app-login__user" style={inputWrapperStyle}>
                        <label htmlFor='enter_id'>Username</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={handleUsername} val={username} id='enter_id'/>
                    </div>
                    <div className="app-login__pw" style={inputWrapperStyle}>
                        <label htmlFor='enter_pw'>Password</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={handlePassword} id='enter_pw'/>
                    </div>
                    <div className="app-login__confirm" style={confirmWrapperStyle}>
                        <div style={{ position: 'relative', marginTop: '10px' }}>
                            <input type="checkbox" id="rememberme" checked={rememberName} onChange={toggleRemember}></input>
                            <label htmlFor="rememberme" > Remember me</label>
                        </div>
                        <ConfirmButton val="Login"/>
                    </div>
                    <span className="app-login__message" style={{color: 'red'}}></span>
                    <div className="app-login__forgetpw">
                        <ForgetPasswordText darkTheme={darkTheme} val="Forgot Password?"/>
                    </div>
                </LoginModal>
            </FlexScreenWrapper>
        </form>
    )
}

export default Login
