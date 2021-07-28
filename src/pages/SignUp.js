import React, { useState } from 'react';
import { UseDarkTheme } from '../resources/ContextProvider';
import styled from 'styled-components';
import {
    confirmWrapperStyle, inputWrapperStyle,
    InputBox, ConfirmButton, FlexScreenWrapper
} from '../resources/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegisterModal = styled.div`
        position: relative;
        width: 450px;
        margin: auto;
        background-color: ${props => props.darkTheme ? '#444' : '#ddd'};
        color: ${props => props.darkTheme ? '#ddd' : '#333'};
        border-radius: 6px;
        box-shadow: ${props => props.darkTheme ? '1px 1px 8px 2px white' : '1px 1px 8px 2px black'};
    `

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const darkTheme = UseDarkTheme();
    const history = useHistory();

    const HandleUsername = (e) => {
        return setUsername(e.target.value);
    }

    const HandlePassword = (e) => {
        return setPassword(e.target.value);
    }

    const HandleEmail = (e) => {
        return setEmail(e.target.value);
    }
    const HandleConfirmPassword = (e) => {
        return setConfirmPassword(e.target.value);
    }

    const RegisterUser = (e) => {
        e.preventDefault();

        let msg = document.querySelector('.app-register__message');
        const vaildEmail = new RegExp
            ("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

        //validate before sending a query
        if (username.length === 0) {
            msg.innerHTML = "User id is required.";
        }
        else if (!vaildEmail.test(email)) {
            msg.innerHTML = "E-mail is invalid.";
        }
        else if (password !== confirmPassword) {
            msg.innerHTML = "Passwords did not match.";
        }
        else {
            console.log("Request sent. ")
            msg.style.color="yellow";
            msg.innerHTML = "Signing up...";
            axios(
                {
                    method: 'POST',
                    url: 'http://127.0.0.1:3001/register',
                    data: {
                        username: username,
                        email: email,
                        password: password
                    }
                }).then(res => {
                    console.log(res.data);
                    history.push('/login');
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response)
                        msg.innerHTML = err.response.data;
                    else
                        msg.innerHTML = "Failed to connect.";
                    
                })
                .finally(() => {
                    msg.style.color = "red";
                })
        }
        return; 
    }
    return (
        <form onSubmit={RegisterUser} method="POST">
            <FlexScreenWrapper className="app-register">
                <RegisterModal darkTheme={darkTheme}>
                    <h1 style={{ paddingTop: '10px', paddingBottom: '14px' }}>Register</h1>

                    <div className="app-register__user" style={inputWrapperStyle}>
                        <label htmlFor='enter_id'>Username</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={HandleUsername} id='enter_id'/>
                    </div>
                    <div className="app-register__email" style={inputWrapperStyle}>
                        <label htmlFor='enter_email'>E-mail</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={HandleEmail} id='enter_email'/>
                    </div>
                    <div className="app-register__pw" style={inputWrapperStyle}>
                        <label htmlFor='enter_pw'>Password</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={HandlePassword} id='enter_pw'/>
                    </div>
                    <div className="app-register__confirm-pw" style={inputWrapperStyle}>
                        <label htmlFor='enter_cpw'>Confirm</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={HandleConfirmPassword} id='enter_cpw' />
                    </div>
                    <span className="app-register__message" style={{ paddingTop: '15px', display: 'block', color: 'red' }}></span>
                    <div className="app-register__confirm" style={confirmWrapperStyle}>
                        <ConfirmButton val="Register" />
                    </div>
                </RegisterModal>
            </FlexScreenWrapper>
        </form>


    )
}

export default SignUp;