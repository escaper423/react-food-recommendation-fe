import React, {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as Link, useHistory } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { headerDark, headerLight, linkActiveDark, linkActiveLight, linkDark, linkLight } from './resources/colors';

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
position: absolute;
display: flex;
float: right;
height: 100%;
width: 100%;
list-style-type: none;
`

const NavLink = styled(Link)`
box-sizing: border-box;
color: ${props=> props.darkTheme ? linkDark : linkLight};
display: flex;
float: left;
margin: 0 12px;
align-items: center;
height: 100%;
text-decoration: none;
border-bottom: 3px solid transparent;

&:hover,
&.active{
    color: ${props=> props.darkTheme ? linkActiveDark : linkActiveLight};
    border-bottom: ${props=> props.darkTheme? '3px solid white' : '3px solid black'};
}
& > h1{
    color: green;
}
`
const NavMenu = styled.nav`
display: inline-block;
position: absolute;
height: 100%;
float: right;
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
color: ${props => props.darkTheme?linkActiveDark:linkActiveLight};

@media screen and (max-width: 768px) {
    display: block;
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
animation: ${popupAnim} 1s;
overflow: hidden;
    @media screen and (max-width: 768px){
        display: block;
        position: fixed;
        top: 60px;
        width: 100%;
        height: 100vh;
        background-color: ${props => props.darkTheme? headerLight : headerDark};
    }
`

const BarLink = styled(Link)`
    box-sizing: border-box;
    display: block;
    text-decoration: none;
    background-color: ${props => props.darkTheme? headerDark : headerLight};
    color: ${props => props.darkTheme? headerLight : headerDark};
    padding: 20px 20px;
    font-size: 1.4rem;
    transition: .1s ease-in-out;
    &:hover{
        transform: scale(1.1,1.1);
        color: ${props => props.darkTheme? linkActiveDark: linkActiveLight};
        
    }
`


export default function NavBar({darkTheme}) {
    const [barDropDownOpen, setBarDropDownOpen] = useState(false);
    const barToggle = () => setBarDropDownOpen(!barDropDownOpen);
    const history = useHistory();

    useEffect( ()=> {
        return history.listen(() => {
            setBarDropDownOpen(false)
        })
    }, [history]);

    return (
        <React.Fragment>
        <Nav>
            <NavLink exact to="/">
                <h1>Home</h1>
            </NavLink>
            <Bar onClick={barToggle} darkTheme={darkTheme}></Bar>
            <NavMenu className="app-header-nav-menu">
                <NavLink darkTheme={darkTheme} to="/about" >About</NavLink>
                <NavLink darkTheme={darkTheme} to="/signup" >Sign Up</NavLink>
                <NavLink darkTheme={darkTheme} to="/contact" >Contact</NavLink>
                <NavBtnLink to="/login" >Login</NavBtnLink>
            </NavMenu>
        </Nav>
        {barDropDownOpen &&
            <BarMenu>
                <BarLink darkTheme={darkTheme} to="/about">About</BarLink>
                <BarLink darkTheme={darkTheme} to="/signup">Sign Up</BarLink>
                <BarLink darkTheme={darkTheme} to="/contact">Contact</BarLink>
                <NavBtnLink darkTheme={darkTheme} to="/login">Login</NavBtnLink>
            </BarMenu>
        }
        </React.Fragment>
    )
}