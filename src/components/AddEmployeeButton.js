import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AddEmployeeButton extends Component {
    render() {
        return (
            <Link to={{pathname: '/employees/add', state: {from: this.props.location}}}>
                <Button>Add</Button>
            </Link>
        )
    }
}

export default withRouter(AddEmployeeButton);
