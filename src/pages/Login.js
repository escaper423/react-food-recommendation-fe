import React, { useState } from 'react';
import { UseDarkTheme } from '../ContextProvider';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { confirmWrapperStyle, inputWrapperStyle } from '../resources/styles';

const initAnim = keyframes`
        from{
            width: 0;
            height: 25%;
        }
        to{
            width: 450px;
            height: 25%;
        }
    `

const LoginModal = styled.div`
        position: relative;
        width: 450px;
        height: 250px;
        margin: auto;
        background-color: ${props => props.darkTheme ? '#444' : '#ddd'};
        color: ${props => props.darkTheme ? '#ddd' : '#333'};
        border-radius: 6px;
        box-shadow: ${props => props.darkTheme ? '1px 1px 8px 2px white' : '1px 1px 8px 2px black'};
        animation: ${initAnim} .35s ease-out;
    `

const InputBox = styled.input`
        width: 70%;
        height: 25px;
        fontSize: 15px;
        border: 0;
        border-bottom: 1px solid ${props => props.darkTheme ? 'white' : 'black'};
        background-color:rgba(0,0,0,0);
        color: ${props => props.darkTheme ? 'white' : 'black'};
        
        &:focus{
            outline:none;
        }
    `

const ConfirmButton = styled.input.attrs({ type: 'submit' })`
        width: 70px;
        height: 30px;
        border: 0;
        border-radius: 4px;
        background-color: #888;
        transition : .1s;
        color: #fff;
        &:hover{
            transform:scale(1.1,1.1);
            background-color:#02e637;
        }
        &:active{
            background-color:#943b0f;
        }
    `

const StyledLink = styled(Link)`
        text-decoration: none;
        color: ${props => props.darkTheme ? 'white' : 'black'};    
        transition: .1s;
        &:hover{
            font-size: 1.1rem;
            transform: scale(1.1,1.1);
        }
    `

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberName, SetRememberName] = useState(true);

    const darkTheme = UseDarkTheme();

    const screenStyle = {
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        backgroundColor: darkTheme ? '#333' : '#fff'
    }

    const LoginUser = (e) => {
        e.preventDefault();
        //dispatch login process
        console.log("Logged in");
    }

    const handleUsername = (e) => {
        return setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        return setPassword(e.target.value);
    }

    const toggleRemember = () => {
        SetRememberName(!rememberName);
    }

    return (
        <form onSubmit={LoginUser}>
            <div className="app-login" style={screenStyle}>
                <LoginModal darkTheme={darkTheme}>
                    <h1 style={{ paddingTop: '10px', paddingBottom: '14px' }}>Login</h1>
                    <div className="app-login__user" style={inputWrapperStyle}>
                        <label for='enter_id'>Username</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={handleUsername}/>
                    </div>
                    <div className="app-login__pw" style={inputWrapperStyle}>
                        <label for='enter_pw'>Password</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={handlePassword}/>
                    </div>
                    <div className="app-login__confirm" style={confirmWrapperStyle}>
                        <div style={{ position: 'relative', marginTop: '3px' }}>
                            <input type="checkbox" id="rememberme" checked={rememberName} onChange={toggleRemember}></input>
                            <label for="rememberme" > Remember me</label>
                        </div>
                        <ConfirmButton />
                    </div>
                    <div className="app-login__forgetpw">
                        <StyledLink darkTheme={darkTheme} to="/forgetpw"><span>Forgot Password?</span></StyledLink>
                    </div>
                </LoginModal>
            </div>
        </form>
    )
}

export default Login
