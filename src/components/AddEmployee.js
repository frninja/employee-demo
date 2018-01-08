import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EmployeeForm from './EmployeeForm';

import EmployeeService from '../services/EmployeeService';

class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInvalidInput = this.handleInvalidInput.bind(this);

        this.handleEmployeeSaveRequestSucceeded = this.handleEmployeeSaveRequestSucceeded.bind(this);
        this.handleEmployeeSaveRequestFailed = this.handleEmployeeSaveRequestFailed.bind(this);
    }

    handleEmployeeSaveRequestSucceeded(response) {
        console.log('Employee saved.');

        const location = this.props.location;
        let redirectTo;
        if (location.state && location.state.from) {
            redirectTo = this.props.location.state.from;
        }
        else {
            redirectTo = '/employees';
        }

        const history = this.props.history;
        history.push(redirectTo);
    }

    handleEmployeeSaveRequestFailed(error) {
        console.log('Employee save failed: ' + error.message);
        this.setState({errorMessage: 'Invalid request.'});
    }

    handleSave(employee) {
        console.log('Saving employee...');
        EmployeeService.createEmployee(employee)
            .then(this.handleEmployeeSaveRequestSucceeded)
            .catch(this.handleEmployeeSaveRequestFailed);
    }

    handleCancel() {
        console.log('Cancel adding employee!');

        const history = this.props.history;
        history.push('/employees');
    }

    handleInvalidInput(errors) {
        this.setState({errorMessage: errors[0]});
    }

    render() {
        return (
            <div>
                <EmployeeForm errorMessage={this.state.errorMessage}
                              onSave={this.handleSave}
                              onCancel={this.handleCancel}
                              onInvalidInput={this.handleInvalidInput}/>
            </div>
        )
    }
}

export default withRouter(AddEmployee);
