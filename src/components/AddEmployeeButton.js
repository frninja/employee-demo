import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddEmployeeButton extends Component {
    render() {
        return (
            <Link to='/employees/add'>
                <Button>Add</Button>
            </Link>
        )
    }
}

export default AddEmployeeButton;
