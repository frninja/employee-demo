import axios from 'axios';
import AuthService from './AuthService';

const EmployeeService = (function () {
    var employeeApiBaseUrl = 'http://localhost:5347/api/employees';

    class EmployeeService {
        getEmployees({pageSize = 10, pageNumber = 1, orderBy = '', descending = false} = {}) {
            return axios.get(employeeApiBaseUrl, {
                headers: {
                    'Authorization': 'Basic ' + AuthService.getAuthenticationToken()
                },
                params: {
                    pageSize,
                    pageNumber,
                    orderBy,
                    descending
                },
                responseType: 'json'
            });
        }

        createEmployee(name, email, birthDay, salary) {
            return axios.post(employeeApiBaseUrl, {
                name, email, birthDay, salary
            },
            {
                headers: {
                    'Authorization': 'Basic ' + AuthService.getAuthenticationToken()
                },
                responseType: 'json'
            })
        }

        deleteEmployee(id) {
            return axios.delete(employeeApiBaseUrl + '/' + id, {
                headers: {
                    'Authorization': 'Basic ' + AuthService.getAuthenticationToken()
                },
                responseType: 'json'
            });
        }
    }

    return EmployeeService;
    }
)();

export default new EmployeeService();
