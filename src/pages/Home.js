import React from 'react';
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { buttonActiveDark, buttonActiveLight, buttonDark, buttonLight, textDark, textLight } from '../resources/colors';
import { BsSearch } from 'react-icons/bs'

const SearchTab = styled.input.attrs({ type: 'text' })`
    width: 192px;
    height: 24px;
    padding: 2px;
    border: 1px solid ${props => props.darkTheme?textDark:textLight};
    border-top: 0;
    border-left: 0;
    border-right: 0;
    background: transparent;
    margin: 0 8px;
    @media screen and (max-width: 600px){
        width: 80%;
    }
`

const SearchButtonArea = styled.div`
    display: inline;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;
    background-color: ${props => props.darkTheme?buttonDark:buttonLight};
    margin: auto 14px;
    justify-content: center;
    
    &:hover{
        background-color: ${props => props.darkTheme?buttonActiveDark:buttonActiveLight};
        transform: scale(1.2,1.2);
    }

    @media screen and (max-width: 600px){
        margin: 20px auto;
        display: block;
        left: 50%;
        transform: translateX(-50%);
        &:hover{
            transform: scale(1.2,1.2) translateX(-40%);
        }
    }
    transition: .1s;
`

const SearchButton = styled(BsSearch)`
    margin: auto;
    margin-top: 25%;
`

const SearchBody = styled.div`
    display: inline;
    @media screen and (max-width: 600px){
        display: block;
    }
`
const Home = () => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    
    const GetRecommendations = (e) =>{
        e.preventDefault();
    }
    localStorage.setItem("navIndex", -1);
    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                height: '70vh',
                backgroundColor: darkTheme ? '#333333' : '#eeeeee'
            }}>
                        <h1>오늘머먹지</h1>
                        <p>zumo!!</p>
                    <SearchBody>
                    <SearchTab darkTheme={darkTheme} placeholder="두끼 전"/><SearchTab darkTheme={darkTheme} placeholder="한끼 전"/>
                    <SearchButtonArea darkTheme={darkTheme}>
                    <SearchButton size="1.2em"/>
                    </SearchButtonArea>
                    </SearchBody>
                
            </div>
            <Footer />
            
        </>
        );
}

export default Home;    