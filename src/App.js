import './App.css';
import React from 'react';
import ContextProvider from './ContextProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
function App() {

  return (
    <Router>
    <ContextProvider>
        <Switch>
          <div className="app">
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </div>
        </Switch>
    </ContextProvider>
    </Router>
  );
}

export default App;
