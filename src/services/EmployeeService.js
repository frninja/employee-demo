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
    }

    return EmployeeService;
    }
)();

export default new EmployeeService();
