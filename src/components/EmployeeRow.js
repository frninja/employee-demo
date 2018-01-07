import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class EmployeeRow extends Component {
    render() {
        const { name, email, birthDay, salary } = this.props.employee;

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{new Date(birthDay).toLocaleDateString()}</td>
                <td>{salary}</td>
                <td><Button>Edit</Button></td>
                <td><Button>Delete</Button></td>
            </tr>
        )
    }
}

export default EmployeeRow;
