import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { headerDark, headerLight, linkActiveDark, linkActiveLight, linkDark, linkLight } from '../resources/colors';
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider';
import homeicon from '../resources/icons/mainchicken.png';

const popupAnim = keyframes`
    from{
        height: 0;
    }
    
    to{
        height: 100%;
    }
`
//styling navbar
const Nav = styled.div`
z-index: 1000;
display: flex;
float: right;
height: 100%;
width: 100%;
list-style-type: none;
`

const NavLink = styled(Link)`
box-sizing: border-box;
width: 80px;
color: ${props => props.darkTheme ? linkDark : linkLight};
display: inline-block;
line-height: 50px;
margin: 0 12px;
height: 100%;
text-decoration: none;
text-align: center;
border-bottom: 3px solid transparent;

&:hover,
&.active{
    border-bottom: 3px solid ${props => props.darkTheme?linkActiveDark:linkActiveLight};
    color: ${props => props.darkTheme ? linkActiveDark : linkActiveLight};
}

$.active{

}
`
const NavMenu = styled.nav`
position: absolute;
height: 100%;
right: 24px;

@media screen and (max-width: 768px){
    display: none;
}
`

const NavBtnLink = styled(Link)`
display: inline-flex;
justify-content: center;
align-items: center;
border-radius: 4px;
background: #256ce1;
margin-top: 8px;
margin-left: 12px;
padding: 10px 12px;
color: #fff;
border: none;
outline: none;
cursor: pointer;
transition: all .2s ease-in-out;
text-decoration: none;

&:hover{
    transition: all .2s ease-in-out;
    background: #fff;
    color: #010606;
}

@media screen and (max-width: 768px){
    display: block;
    width: 80%;
    font-size: 1.4rem;
    margin: 10px auto;
    padding: 10px;
}
`

const Bar = styled(FaBars)`
display: none;
@media screen and (max-width: 768px) {
    display: block;
    color: ${props => props.darkTheme ? linkActiveDark : linkActiveLight};
    position: absolute;
    font-size: 1.5rem;
    float: right;
    right: 25px;
    height: 100%;
    cursor: pointer;
}
`

const BarMenu = styled.div`
display: none;
text-align: center;
align-items: center;
animation: ${popupAnim} .4s;
overflow: hidden;
    @media screen and (max-width: 768px){
        display: block;
        position: fixed;
        top: 60px;
        width: 100%;
        height: 100vh;
        z-index: 100;
        background-color: ${props => props.darkTheme ? headerDark : headerLight};
    }
`

const BarLink = styled(Link)`
    box-sizing: border-box;
    display: block;
    text-decoration: none;
    z-index: 100;
    background-color: ${props => props.darkTheme ? headerDark : headerLight};
    color: ${props => props.darkTheme ? linkDark : linkLight};
    padding: 20px 20px;
    font-size: 1.4rem;
    transition: .1s ease-in-out;
    &:hover{
        transform: scale(1.1,1.1);
        color: ${props => props.darkTheme ? linkActiveDark : linkActiveLight};
        
    }
`

export default function NavBar() {
    const darkTheme = UseDarkTheme();
    const [barDropDownOpen, setBarDropDownOpen] = useState(false);
    const barToggle = () => setBarDropDownOpen(!barDropDownOpen);
    const navigate = useNavigate();
    const user = UseAuthUser();

    const menuAnimBar = document.createElement('div');
    menuAnimBar.className = "header-nav__selectanim";


    function userPanel() {
        return (
            (!user) ?
                <>
                    <NavBtnLink to="/signup" >Sign Up</NavBtnLink>
                    <NavBtnLink to="/login" >Login</NavBtnLink>
                </>
                :
                <NavBtnLink to='/logout'>Log Out</NavBtnLink>
        )
    }

    function userBarPanel() {
        return (
            (!user) ?
                <>
                    <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                    <NavBtnLink to="/login">Login</NavBtnLink>
                </>
                :
                <NavBtnLink to="/logout">Log Out</NavBtnLink>
        )
    }

    useEffect(() => {
            setBarDropDownOpen(false)
    }, [navigate]);
    
    /*
    useEffect(() => {
        console.log(menuAbout);
        
    }, [cursorIndex])
*/
    return (
        <React.Fragment>
            <Nav>
                <NavLink darkTheme={darkTheme} exact to="/">
                    <img src={homeicon}></img>
                </NavLink>
                <Bar onClick={barToggle} darkTheme={darkTheme}></Bar>
                <NavMenu className="header-nav-menu">
                    {user?<p style={{display:'inline-block'}}>{user.username} 님</p>:null}
                    <NavLink className="header-nav-freeboard" darkTheme={darkTheme} to="/board" >Freeboard</NavLink>
                    {userPanel()}
                    
                </NavMenu>

                {barDropDownOpen &&
                    <BarMenu darkTheme={darkTheme}>
                        <BarLink darkTheme={darkTheme} to="/board">Freeboard</BarLink>

                        {userBarPanel()}
                    </BarMenu>
                }
            </Nav>
        </React.Fragment>
    )
}
