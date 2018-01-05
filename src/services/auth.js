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
                responseType: 'json'
            })
            .then(response => ({token: response.data}),
                error => {
                if (error.response && error.response.status === 401)
                    throw new Error('Invalid username or password.')
                throw error;
            });
        }
    }

    return AuthService;
})();

export default new AuthService();