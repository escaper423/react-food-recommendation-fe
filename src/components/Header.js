import React from 'react';
import { UseDarkTheme } from '../resources/ContextProvider';
import NavBar from './NavBar';
import { headerDark, headerLight } from '../resources/colors';

function Header() {
    const darkTheme = UseDarkTheme();

    const headerStyle = {
        position: 'sticky',
        height: '60px',
        backgroundColor: darkTheme ?  headerDark: headerLight,
        color: darkTheme ? headerLight : headerDark,
    }

    const menuStyle = {
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
    }

    return (
        <section id='app-header' style={headerStyle}>
            <div id='app-header-menu' style={menuStyle}>
                <NavBar />
            </div>
        </section>
    )
}

export default Header
