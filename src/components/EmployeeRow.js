import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class EmployeeRow extends Component {
    render() {
        const { id, name, email, birthDay, salary } = this.props.employee;

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{new Date(birthDay).toLocaleDateString()}</td>
                <td>{salary}</td>
                <td>
                    <Link to={{pathname: '/employees/' + id + '/edit', state: {from: this.props.location}}}>
                        <Button>Edit</Button>
                    </Link>
                </td>
                <td><Button onClick={() => this.props.onDelete(id)}>Delete</Button></td>
            </tr>
        )
    }
}

export default withRouter(EmployeeRow);
