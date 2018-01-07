import React, { Component } from 'react';

import SortDirections from './shared/SortDirections';

class EmployeeTableHeader extends Component {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getNameWithDirection(name) {
        if (this.props.sortBy !== name)
            return this.capitalize(name);

        const direction = this.props.sortDirection === SortDirections.DESC ? '\u2191' : '\u2193';
        return this.capitalize(name) + direction;
    }

    render() {
        return (
            <thead>
            <tr>
                <th onClick={() => this.props.onSortChanged('name')}>{this.getNameWithDirection('name')}</th>
                <th onClick={() => this.props.onSortChanged('email')}>{this.getNameWithDirection('email')}</th>
                <th onClick={() => this.props.onSortChanged('birthday')}>{this.getNameWithDirection('birthday')}</th>
                <th onClick={() => this.props.onSortChanged('salary')}>{this.getNameWithDirection('salary')}</th>
            </tr>
            </thead>
        )
    }
}

export default EmployeeTableHeader;
