import './App.css';
import React, { useEffect, useRef } from 'react';
import { UseDarkTheme, UseSetAuthUser, UseSetDarkTheme } from './resources/ContextProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Write from './pages/Write';
import Cookies from 'js-cookie';
import InBoard from './pages/InBoard';
import axios from 'axios';
import Freeboard from './pages/Freeboard';
import { screenDark, screenLight, textDark, textLight } from './resources/colors';
import SearchResult from './pages/SearchResult';

function App() {
  const darkTheme = UseDarkTheme();
  const SetDarkTheme = UseSetDarkTheme();
  const SetUser = UseSetAuthUser();
  
  let mode = useRef(localStorage.getItem('darktheme'));

  useEffect(() => {
    SetDarkTheme((mode.current === '1') ? true : false);

    axios({
      method: 'GET',
      url: 'http://localhost:3001/refresh',
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      SetUser({
          username: res.data.username,
          accessToken: res.data.accessToken
      });
    }).catch((err) => {
      Cookies.set('refreshToken',"");
    });
  }, [])

  const appStyle = {
    backgroundColor: darkTheme? screenDark: screenLight,
    color: darkTheme?  textDark:textLight,
    minHeight: '100vh',
    height: '100%',
  }

  return (
    <Router>
    <div className="app" style={appStyle}>
      <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/board/write' exact element={<Write />}/>
            <Route path='/board' exact element={<Freeboard />} />
            <Route path='/board/:category/:id' exact element={<InBoard />} />
        
      </Routes>
    </div>
    </Router>
    

  );
}

export default App;
