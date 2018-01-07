import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './components/App';
import PrivateRoute from './components/PrivateRoute';
import EmployeeTable from "./components/EmployeeIndex";
import Login from "./components/Login";

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/employees' component={EmployeeTable} />
        </Switch>
    </Router>
), document.getElementById('root'));
