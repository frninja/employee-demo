import axios from 'axios';

let AuthService = (function () {
    var authenticationUrl = 'http://localhost:5347/api/authenticate';

    class AuthService {
        login(username, password) {
            return axios.post(authenticationUrl, undefined, {
                auth: {
                    username: username,
                    password: password
                },
            })
            .then(response => {
                return response.status !== 401;
            })
            .catch(error => {
                return false;
            });
        }
    }

    return AuthService;
})();

export default new AuthService();