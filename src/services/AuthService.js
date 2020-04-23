import AuthState from "./AuthState";
import { api, csrf } from '../util/helpers';
import Axios from "axios";

Axios.defaults.withCredentials = true;

// Check if the user is logged in
const updateAuthState = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('user'))
        .then(() => AuthState.loggedIn = true)
        .catch(() => AuthState.loggedIn = false)
        .finally(() => resolve());
    });
};

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        Axios.get(csrf()).then(() => {
            Axios.post(api('login'), {
                email: email,
                password: password,
            })
            .then(res => {
                AuthState.loggedIn = true;
                resolve(res.data);
            })
            .catch(err => reject(err.response.data));
        });
    });
};

const logout = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('logout'))
        .then(res => {
            AuthState.loggedIn = false;
            resolve(res.data);
        })
        .catch(err => reject(err.response.data));
    });
};

const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
        Axios.get(csrf()).then(() => {
            Axios.post(api('register'), {
                name: name,
                email: email,
                password: password,
            })
            .then(res => {
                AuthState.loggedIn = true;
                resolve(res.data);
            })
            .catch(err => reject(err.response.data));
        });
    });
};

export default {
    updateAuthState,
    login,
    logout,
    register,
}
