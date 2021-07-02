import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

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
    justifyContent: 'space-between',
}

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

const InputBoxStyle = styled.input`
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

const ConfirmButtonStyle = styled.input.attrs({ type: 'submit' })`
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

export const InputBox = ({darkTheme}) => {
    return(
        <InputBoxStyle darkTheme = {darkTheme} />
    )
}
export const ConfirmButton = () =>{
    return(
        <ConfirmButtonStyle /> 
    )
}