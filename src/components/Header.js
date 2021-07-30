import React from 'react';
import { UseDarkTheme, UseSetAuthUser, UseSetDarkTheme } from '../resources/ContextProvider';
import NavBar from './NavBar';
import { headerDark, headerLight, textDark, textLight } from '../resources/colors';
import { FaLightbulb } from 'react-icons/fa'
import styled from 'styled-components';
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
    }

    const navStyle = {
        position: 'relative',
        width: '100%',
        height: '60px',
    }

    const modesStyle = {
        position: 'relative',
        display: 'flex',
        width: '100%',
    }

    const ThemeButton = styled(FaLightbulb)`
        &:hover{
            transform: scale(1.15,1.15);
        }
    `
    return (
        <>
        <div className='app-header' style={headerStyle}>
            <section className='app-header-navbar' style={navStyle}>
                <NavBar />
            </section>
            <section className="app-header-modes" style={modesStyle}>
                <div style={{position: 'relative', float:'left', right: '-95%',padding:'5px', color: darkTheme?textDark:textLight,textAlign:'center' }}>
                <ThemeButton size='1.2rem' onClick={ToggleTheme} Set/>
                <p style={{fontSize:'0.7rem'}}>{(darkTheme)?"Light":"Dark"}</p>
                </div>
            </section>
        </div>
        </>
    )
}

export default Header
