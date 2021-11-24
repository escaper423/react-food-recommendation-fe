import React, { useState, useRef } from 'react';
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { buttonActiveDark, buttonActiveLight, buttonDark, buttonLight } from '../resources/colors';
import { BsSearch } from 'react-icons/bs'
import SearchBar from '../components/SearchBar';
import { Navigate, useNavigate } from 'react-router';


const SearchButtonArea = styled.div`
    display: inline;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;
    background-color: ${props => props.darkTheme ? buttonDark : buttonLight};
    margin: auto 14px;
    justify-content: center;
    
    &:hover{
        background-color: ${props => props.darkTheme ? buttonActiveDark : buttonActiveLight};
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
    const navigate = useNavigate();

    const twoTimesAgo = useRef(null);
    const oneTimeAgo = useRef(null);

    const FindRecommendation = () => {
        navigate(`/search?twoTimesAgo=${twoTimesAgo.current.value}&oneTimeAgo=${oneTimeAgo.current.value}`)
    }

    const GetRecommendations = (e) => {
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
                    <SearchBar darkTheme={darkTheme} placeholder="두끼 전" forwardedRef={twoTimesAgo}/>
                    <SearchBar darkTheme={darkTheme} placeholder="한끼 전" forwardedRef={oneTimeAgo}/>
                    <SearchButtonArea onClick={FindRecommendation} darkTheme={darkTheme} >
                        <SearchButton size="1.2em" />
                    </SearchButtonArea>
                </SearchBody>

            </div>
            <Footer />

        </>
    );
}

export default Home;