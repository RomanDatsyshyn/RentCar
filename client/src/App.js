import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/AuthActions';

import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/layout/NavBar';
import SearchForm from './components/layout/SearchForm';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/ALogin';
import Cars from './components/cars/Cars';
import Car from './components/cars/Car';
import AddCar from './components/cars/AddCar';
import Profile from './components/auth/Profile';
import Edit from './components/auth/Edit';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get info exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/users/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <NavBar />
            <Route exact path='/' component={SearchForm} />
            <Route exact path='/admin' component={AdminLogin} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/cars' component={Cars} />
            <Route path='/cars/:id' component={Car} />
            <Route exact path='/addcar' component={AddCar} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/edit/:id' component={Edit} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
