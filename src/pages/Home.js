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
`

const SearchButtonArea = styled.div`
    display:flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0;
    background-color: ${props => props.darkTheme?buttonDark:buttonLight};
    margin: 12px auto;
    justify-content: center;
    &:hover{
        background-color: ${props => props.darkTheme?buttonActiveDark:buttonActiveLight};
        font-size: 1.4em;
        
    }
    transition: .1s;
`

const SearchButton = styled(BsSearch)`
    margin: auto;
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
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                height: '70vh',
                width: '100%',
                backgroundColor: darkTheme ? '#333333' : '#eeeeee'
            }}>
                    <div>
                        <h1>오늘머먹지</h1>
                        <p>이전에 어떤 음식들을 먹었나요?</p>
                    <SearchTab darkTheme={darkTheme} placeholder="두끼 전"/><SearchTab darkTheme={darkTheme} placeholder="한끼 전"/>  
                    <SearchButtonArea darkTheme={darkTheme}>
                    <SearchButton size="1.2em"/>
                    </SearchButtonArea>
                    </div>
                
            </div>
            <Footer />
            
        </>
        );
}

export default Home;    