import React from 'react';
import { UseDarkTheme } from '../resources/ContextProvider';
import NavBar from './NavBar';
import { headerDark, headerLight } from '../resources/colors';

function Header() {
    const darkTheme = UseDarkTheme();

    const headerStyle = {
        position: 'fixed',
        top: '0',
        height: '60px',
        width: '100%',
        backgroundColor: darkTheme ? headerDark : headerLight,
        color: darkTheme ? headerLight : headerDark,
    }

    const menuStyle = {
        width: '100%',
        height: '60px',
    }

    return (
        <>
            <section className='app-header' style={headerStyle}>
                <NavBar />
            </section>
            <div className='app-header-menu' style={menuStyle}>
            </div>
        </>
    )
}

export default Header
