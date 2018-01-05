import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../services/auth';

class App extends Component {
    render() {
        return AuthService.isAuthenticated() ? (
                <Redirect to='/employees'/>
            )
            : (
                <Redirect to='/login'/>
            )
    }
}

export default App;
