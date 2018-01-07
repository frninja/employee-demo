import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import moment from 'moment';
import 'moment/min/locales.min'; // HACK: workaround for moment locale.

import 'react-datepicker/dist/react-datepicker.css';

class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            birthDay: moment(),
            salary: null,
        }

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        console.log('Saving employee...');
    }

    render() {
        return (
            <form onSubmit={this.handleSave}>
                <FormGroup controlId='name'>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type='text' value={this.state.name}/>
                </FormGroup>
                <FormGroup controlId='email'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type='email' value={this.state.email}/>
                </FormGroup>
                <FormGroup controlId='birthday'>
                    <ControlLabel>Birthday</ControlLabel>
                    <DatePicker selected={this.state.birthDay} locale={navigator.language}/>
                </FormGroup>
                <FormGroup controlId='salary'>
                    <ControlLabel>Salary</ControlLabel>
                    <FormControl type='number' value={this.state.salary}/>
                </FormGroup>
                <Button type='submit'>Save</Button>
            </form>
        )
    }
}

export default AddEmployee;
