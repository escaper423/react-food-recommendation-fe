import React from 'react';
import { UseDarkTheme, UseSetDarkTheme } from '../resources/ContextProvider';
import NavBar from './NavBar';
import { headerDark, headerLight, textDark, textLight } from '../resources/colors';
import { FaLightbulb } from 'react-icons/fa'
import styled from 'styled-components';

const ThemeButton = styled(FaLightbulb)`
        &:hover{
            transform: scale(1.15,1.15);
        }
    `

function Header() {
    const darkTheme = UseDarkTheme();
    const SetDarkTheme = UseSetDarkTheme();

    const ToggleTheme = () => {
        let theme = localStorage.getItem('darktheme');
        console.log(theme);
        theme = (theme === '1')?'0':'1';
        SetDarkTheme(theme ==='0'?false:true);
        localStorage.setItem('darktheme',theme);
    }
    const headerStyle = {
        position: 'sticky',
        top: '0',
        width: '100%',
        backgroundColor: darkTheme ? headerDark : headerLight,
        color: darkTheme ? headerLight : headerDark,
        zIndex: '500'
    }

    const navStyle = {
        position: 'relative',
        width: '100%',
        height: '60px',
    }

    const modesStyle = {
        position: 'relative',
        width: '100%',
        height: '50px',
    }

    
    return (
        <>
        <div className='header' style={headerStyle}>
            <section className='header-navbar' style={navStyle}>
                <NavBar />
            </section>
            <section className="header-modes" style={modesStyle}>
                <div style={{position: 'relative', float:'right' , right: '25px',padding:'5px', color: darkTheme?textDark:textLight,textAlign:'center' }}>
                <ThemeButton size='1.2rem' onClick={ToggleTheme} Set/>
                <p style={{fontSize:'0.7rem'}}>{(darkTheme)?"Light":"Dark"}</p>
                </div>
            </section>
        </div>
        </>
    )
}

export default Header
