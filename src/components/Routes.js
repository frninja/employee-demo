import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmployeeIndex from './EmployeeIndex';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

const Routes = (
    <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/employees' component={EmployeeIndex}/>
        <PrivateRoute exact path='/employees/add' component={AddEmployee}/>
        <PrivateRoute path='/employees/:employeeId/edit' component={EditEmployee}/>
    </Switch>
)

export default Routes;
