import axios from 'axios';

let AuthService = (function () {
    // TODO: Extract URL to config.
    var authenticationUrl = 'http://localhost:5347/api/authenticate';

    class AuthService {
        isAuthenticated() {
            return sessionStorage.getItem('token') !== null
        }

        login(username, password) {
            return axios.post(authenticationUrl, undefined, {
                 auth: {
                     username: username,
                     password: password
                 },
                responseType: 'json'
            })
            .then(
                response => {
                    const token = response.data;
                    sessionStorage.setItem('token', token);
                    return {token: token};
                },
                error => {
                    if (error.response && error.response.status === 401)
                        throw new Error('Invalid username or password.');
                    throw error;
                });
        }
    }

    return AuthService;
})();

export default new AuthService();