import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EmployeeForm from './EmployeeForm';

import EmployeeService from '../services/EmployeeService';
import goToPreviousLocation from '../utils/GoToPreviousLocation';

class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInvalidInput = this.handleInvalidInput.bind(this);
    }

    handleSave(employee) {
        console.log('Saving employee...');
        EmployeeService.createEmployee(employee)
            .then(response => {
                console.log('Employee saved.');
                goToPreviousLocation(this, '/employees');
            })
            .catch(error => {
                console.log('Employee save failed: ' + error.message);
                this.setState({errorMessage: 'Invalid request.'});
            });
    }

    handleCancel() {
        console.log('Cancel adding employee!');

        goToPreviousLocation(this, '/employees');
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
