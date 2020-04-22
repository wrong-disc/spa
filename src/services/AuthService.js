import AuthState from "./AuthState";

// Check if the user is logged in
const updateAuthState = () => {
    return new Promise((resolve, reject) => {
        // TODO: API call
        let l = window.localStorage.getItem('loggedIn') === "true"; // Mock server
        AuthState.loggedIn = l;
        resolve();
    });
};

const login = () => {
    return new Promise((resolve, reject) => {
        // TODO: API call
        AuthState.loggedIn = true;
        window.localStorage.setItem('loggedIn', AuthState.loggedIn ? "true" : "false"); // Mock server
        resolve();
    });
};

const logout = () => {
    return new Promise((resolve, reject) => {
        // TODO: API call
        AuthState.loggedIn = false;
        window.localStorage.setItem('loggedIn', AuthState.loggedIn ? "true" : "false"); // Mock server
        resolve();
    });
};

const register = () => {
    return new Promise((resolve, reject) => {
        // TODO: API call
        AuthState.loggedIn = true;
        window.localStorage.setItem('loggedIn', AuthState.loggedIn ? "true" : "false"); // Mock server
        resolve();
    });
};

export default {
    updateAuthState,
    login,
    logout,
    register,
}
