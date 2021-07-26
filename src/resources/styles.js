import styled from "styled-components";
import { Link } from "react-router-dom";
import { UseDarkTheme } from "./ContextProvider";

export const inputWrapperStyle = {
    display: 'flex',
    width: '80%',
    margin: 'auto',
    padding: '2px 0',
    justifyContent: 'space-between'
}

export const confirmWrapperStyle = {
    display: 'flex',
    width: '80%',
    margin: '20px auto',
    padding: '2px 0',
    justifyContent: 'space-around',
}

const ScreenWrapperStyle = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    background-color: ${props => props.darkTheme? '#333' : '#fff'};
`

const InputBoxStyle = styled.input`
        width: 70%;
        height: 25px;
        fontSize: 15px;
        border: 0;
        border-bottom: 1px solid ${props => props.darkTheme ? 'white' : 'black'};
        background-color:transparent;
        color: ${props => props.darkTheme ? 'white' : 'black'};
        
        &:focus{
            outline:none;
        }
        &:autofill:hover,
        &:autofill:fill,
        &:autofill:active,
        {
            background-color: ${props => props.darkTheme? '#444':'#ddd'};
            color: ${props => props.darkTheme? '#ddd':'#333'};
        }
    `

const ConfirmButtonStyle = styled.input.attrs({ type: 'submit' })`
        border: 0;
        padding: 10px 16px;
        border-radius: 4px;
        background-color: #888;
        transition : .1s;
        font-size: 1rem;
        color: #fff;
        &:hover{
            transform:scale(1.1,1.1);
            background-color:#02e637;
        }
        &:active{
            background-color:#943b0f;
        }
    `

const ForgetPasswordTextStyle = styled(Link)`
        text-decoration: none;
        color: ${props => props.darkTheme ? 'white' : 'black'};    
        transition: .1s;
        &:hover{
            font-size: 1.1rem;
            transform: scale(1.1,1.1);
        }
    `
export const ScreenWrapper = ({children}) => {
    const darkTheme = UseDarkTheme();
    return(
        <ScreenWrapperStyle darkTheme={darkTheme}>
            {children}
        </ScreenWrapperStyle>
    )
}
export const InputBox = ({darkTheme, type, onChange, val, id}) => {
    return(
        <InputBoxStyle darkTheme = {darkTheme} type={type} onChange={onChange} value={val} id={id}/>
    )
}
export const ConfirmButton = ({val}) =>{
    return(
        <ConfirmButtonStyle value={val}/> 
    )
}

export const ForgetPasswordText = ({darkTheme, val}) => {
    return(
        <ForgetPasswordTextStyle to="/forgetpw" darkTheme={darkTheme}>{val}</ForgetPasswordTextStyle>
    )
}
