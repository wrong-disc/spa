import React from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import AuthState from '../../services/AuthState';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    login = () => {
        AuthService
        .login(prompt('email'), prompt('password'))
        .then(() => this.setState({ redirect: true }))
        .catch(err => {
            this.setState({ redirect: false });
            alert(err.message);
        })
        .finally(this.props.updateMe);
    }

    render () {
        if(AuthState.loggedIn === true) return <Redirect to='/' />
        return this.state.redirect
        ? <Redirect to='/' />
        : (
            <div className="w-full h-full flex items-center justify-center">
                        
                <div className="text-center">
                    <h1 className="text-6xl font-bold tracking-tight border-gray-900 border-4 px-4 pb-1">Wrong Disc</h1>
                    <h2 className="mt-4 text-3xl font-light tracking-tight">Welcome</h2>
                    <button onClick={this.login} className="mt-10 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-2xl shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700">Login</button>
                    <div className="mt-8 text-sm text-gray-800">
                        Don't have an account?
                        <NavLink to="/register">
                            <div className="text-md font-bold hover:text-gray-700">Register</div>
                        </NavLink>
                    </div>
                </div>

            </div>
        );
    }

}
