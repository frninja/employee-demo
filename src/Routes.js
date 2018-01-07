import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App';
import AddEmployee from './components/AddEmployee';
import EmployeeIndex from './components/EmployeeIndex';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const Routes = (
    <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/employees' component={EmployeeIndex}/>
        <PrivateRoute exact path='/employees/add' component={AddEmployee}/>
    </Switch>
)

export default Routes;
