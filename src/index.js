import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './components/App';
import EmployeeTable from "./components/EmployeeTable";
import Login from "./components/Login";

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/employees' component={EmployeeTable} />
        </Switch>
    </Router>
), document.getElementById('root'));
