import './App.css';
import React, { useEffect, useRef } from 'react';
import { UseAuthUser, UseSetAuthUser, UseSetDarkTheme } from './resources/ContextProvider';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Cookies from 'js-cookie';
import axios from 'axios';
import Freeboard from './pages/Freeboard';

function App() {
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


  return (

    <Router>
      <Switch>
        <React.Fragment>
          <div className="app">
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/board' component={Freeboard} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
          </div>
        </React.Fragment>
      </Switch>
    </Router>

  );
}

export default App;
