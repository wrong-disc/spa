import React from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import AuthState from '../../services/AuthState';

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name:"",
            email:"",
            password:"",
            repassword:"",
            error:""
        };
    }
    handleName = (event) => {
        this.setState ({
            name: event.target.value
        });
    }
    handleEmail = (event) => {
        this.setState ({
            email: event.target.value
        });
    }

    handlePassword = (event) => {
        this.setState ({
            password: event.target.value
        });
    }
    handleRePassword = (event) => {
        this.setState ({
            repassword: event.target.value
        });
    }

    register = () => {
        if(this.state.password != this.state.repassword){
            this.setState({
                error: "Passwords do not match"
            });
        }else{
            AuthService
            .register(this.state.name, this.state.email, this.state.password)
            .then(() => this.setState({ redirect: true }))
            .catch(err => {
                this.setState({ 
                    redirect: false,
                    error: err.message 
                });
            })
            .finally(this.props.updateMe);
        }
    }

    render () {
        if(AuthState.loggedIn === true) return <Redirect to='/' />
        return this.state.redirect
        ? <Redirect to='/' />
        : (
            <div className="w-full h-full flex items-center justify-center">

                <div className="text-center">
                    <h1 className="text-6xl font-bold tracking-tight border-gray-900 border-4 px-4 pb-1">Wrong Disc</h1>
                    <h2 className="mt-4 text-3xl font-light tracking-tight">Create Account</h2>
                    <p className="text-red-600 text-sm font-bold mt-2"> {this.state.error}</p> 
                    <div className="flex flex-col mt-2 ">
                        <input type="text" placeholder="Full Name" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" value={this.state.name} onChange={this.handleName}/>
                        <input type="email" placeholder="Email Address " className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" value={this.state.email} onChange={this.handleEmail}/>
                        <input type="password" placeholder="Password" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" value={this.state.password} onChange={this.handlePassword} />
                        <input type="password" placeholder="Repeat Password" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" value={this.state.repassword} onChange={this.handleRePassword} />
                    </div>
                    <button onClick={this.register} className="mt-10 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-2xl shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700">Register</button>
                    <div className="mt-8 text-sm text-gray-800">
                        Already have an account?
                        <NavLink to="/login">
                            <div className="text-md font-bold hover:text-gray-700">Login</div>
                        </NavLink>
                    </div>
                </div>

            </div>
        );
    }

}
