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
        AuthService.login()
        .then(() => this.setState({ redirect: true }))
        .catch(() => this.setState({ redirect: false }))
        .finally(() => this.props.updateMe());
    }

    render () {
        if(AuthState.loggedIn === true) return <Redirect to='/' />
        return this.state.redirect
        ? <Redirect to='/' />
        : (
            <div className="w-full h-full flex items-center justify-center">
                        
                <div className="text-center">
                    <h1 className="text-6xl font-bold tracking-tight">Wrong Disc</h1>
                    <hr/>
                    <h2 className="mt-2 text-2xl font-light tracking-tight">Welcome</h2>
                    <button onClick={this.login} className="mt-6 bg-gray-200 text-gray-800 py-2 px-8 rounded-full font-bold text-xl shadow focus:outline-none hover:bg-gray-300 focus:bg-gray-400">Login</button>
                    <div className="mt-8 text-sm text-gray-800">
                        Don't have an account?
                        <NavLink to="/register">
                            <div className="font-bold hover:text-gray-700">Register</div>
                        </NavLink>
                    </div>
                </div>

            </div>
        );
    }

}
