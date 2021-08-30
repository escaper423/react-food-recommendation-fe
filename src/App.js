import './App.css';
import React, { useEffect, useRef } from 'react';
import { UseDarkTheme, UseSetAuthUser, UseSetDarkTheme } from './resources/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
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

function App() {
  const SetDarkTheme = UseSetDarkTheme();
  const SetUser = UseSetAuthUser();
  const darkTheme = UseDarkTheme();

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
      <Switch>
        <React.Fragment>
          <div className="app" style={appStyle}>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route exact path='/board/write' component={Write} />
            <Route exact path='/board' component={Freeboard} />
            <Route exact path='/board/:category/:id' component={InBoard} />
          </div>
        </React.Fragment>
      </Switch>
    </Router>

  );
}

export default App;
