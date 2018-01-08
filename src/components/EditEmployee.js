import React, { Component } from 'react';

import EmployeeForm from './EmployeeForm';

import EmployeeService from '../services/EmployeeService';
import goToPreviousLocation from '../utils/GoToPreviousLocation';

class EditEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = this.mapParamsToState(this.props.match.params);

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInvalidInput = this.handleInvalidInput.bind(this);
    }

    mapParamsToState({employeeId}) {
        return { employeeId };
    }

    componentDidMount() {
        EmployeeService.getEmployee(this.state.employeeId).then(response => {
            this.setState({employee: response.data});
        }).catch(error => {
            console.log('Employee get failed.');
        });
    }

    handleSave(employee) {
        EmployeeService.updateEmployee({id: this.state.employee.id, ...employee})
        .then(response => {
            console.log('Employee edited.');
            goToPreviousLocation(this, '/employees');
        })
        .catch(error => {
            console.log('Employee edit failed: ' + error.message);
            this.setState({errorMessage: 'Invalid request.'});
        })
    }

    handleCancel() {
        console.log('Cancel adding employee!');

        goToPreviousLocation(this, '/employees');
    }

    handleInvalidInput(errors) {
        this.setState({errorMessage: errors[0]});
    }

    render() {
        if (!this.state.employee) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <EmployeeForm employee={this.state.employee}
                              errorMessage={this.state.errorMessage}
                              onSave={this.handleSave}
                              onCancel={this.handleCancel}
                              onInvalidInput={this.handleInvalidInput}/>
            </div>
        )
    }
}

export default EditEmployee;
