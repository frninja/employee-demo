import React, { Component } from 'react';

import EmployeeForm from './EmployeeForm';

import EmployeeService from '../services/EmployeeService';

class EditEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = this.mapParamsToState(this.props.match.params);
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
        // TODO: Update employee.
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
                <EmployeeForm employee={this.state.employee} onSave={this.handleSave}
                              onCancel={this.handleCancel}
                              onInvalidInput={this.handleInvalidInput}/>
                <span className='error' hidden={!this.state.errorMessage}>{this.state.errorMessage}</span>
            </div>
        )
    }
}

export default EditEmployee;
