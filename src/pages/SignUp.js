import React from 'react';
import { UseDarkTheme } from '../ContextProvider';
import styled, {keyframes} from 'styled-components';
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

const RegisterModal = styled.div`
        position: relative;
        width: 450px;
        height: 650px;
        margin: auto;
        background-color: ${props => props.darkTheme ? '#444' : '#ddd'};
        color: ${props => props.darkTheme ? '#ddd' : '#333'};
        border-radius: 6px;
        box-shadow: ${props => props.darkTheme ? '1px 1px 8px 2px white' : '1px 1px 8px 2px black'};
        animation: ${initAnim} .35s ease-out;
    `
const RegisterUser = () => {
    return;
}

const SignUp = () => {
    const darkTheme = UseDarkTheme();

    const screenStyle = {
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        backgroundColor: darkTheme ? '#333' : '#fff'
    }

    return (
        
        <form onSubmit={RegisterUser}>  
            <div className="app-register" style={screenStyle}>
                <RegisterModal darkTheme={darkTheme}>
                    <h1 style={{paddingTop: '10px', paddingBottom: '14px'}}>Sign in</h1>
                </RegisterModal>
            </div>
        </form>
        

    )
}

export default SignUp;


/*
                    <div className="app-register__user" style={inputWrapperStyle}>
                        <label for='enter_id'>Username</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={handleUsername}/>
                    </div>
                    <div className="app-register__email" style={inputWrapperStyle}>
                        <label for='enter_id'>Username</label>
                        <InputBox darkTheme={darkTheme} type='text' onChange={handleUsername}/>
                    </div>
                    <div className="app-register__pw" style={inputWrapperStyle}>
                        <label for='enter_pw'>Password</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={handlePassword}/>
                    </div>
                    <div className="app-register__confirm-pw" style={inputWrapperStyle}>
                        <label for='enter_pw'>Password</label>
                        <InputBox darkTheme={darkTheme} type='password' onChange={handlePassword}/>
                    </div>
                    <div className="app-register__confirm" style={confirmWrapperStyle}>
                        <div style={{ position: 'relative', marginTop: '3px' }}>
                            <input type="checkbox" id="rememberme" checked={rememberName} onChange={toggleRemember}></input>
                            <label for="rememberme" > Remember me</label>
                        </div>
                        <ConfirmButton value="Register" />
                    </div>
                    */