import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export default class UserCardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: null,
            userLoaded: false
        };
    }

    componentDidMount() {
        UserService
        .get()
        .then(user => this.setState({ user: user, userLoaded: true }))
        .catch(err => console.log('Error getting authenticated user: ' + err.message));
    }

    logout = () => {
        AuthService
        .logout()
        .then(this.props.updateMe);
    }

    render() {
        return (
            <div>

                { this.state.open &&
                    <div onClick={() => { this.setState({ open: false }) }} className="z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-50"></div>
                }

                <div className="flex flex-col items-end">
                    <button onClick={() => { this.setState((state) => ({ open: !state.open })) }} className="z-50 bg-gray-900 text-gray-200 hover:bg-gray-800 rounded-full shadow-lg flex items-center focus:outline-none">
                        <img className="h-10 w-10 rounded-full object-fit" alt="User avatar" src={ this.state.userLoaded ? 'https://www.gravatar.com/avatar/' + this.state.user.md5 + '?d=identicon' : 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg' }/>
                        <div className="ml-2 mr-3">{ this.state.userLoaded ? this.state.user.name : 'Loading...' }</div>
                    </button>
                    { this.state.open &&
                        <div className="z-50 mt-2 p-4 w-64 bg-gray-900 text-gray-300 text-lg rounded shadow-lg flex flex-col">
                            <p className="text-xs tracking-tight text-gray-700 uppercase font-bold">Editor Panel</p>
                            <NavLink to="/editor/artist" onClick={() => { this.setState({ open: false }) }} className="py-2 px-2 w-full text-left hover:bg-gray-800 focus:outline-none rounded">Edit Artists</NavLink>
                            <NavLink to="/editor/album" onClick={() => { this.setState({ open: false }) }} className="py-2 px-2 w-full text-left hover:bg-gray-800 focus:outline-none rounded">Edit Albums</NavLink>
                            <NavLink to="/editor/track" onClick={() => { this.setState({ open: false }) }} className="py-2 px-2 w-full text-left hover:bg-gray-800 focus:outline-none rounded">Edit Tracks</NavLink>
                            <button onClick={this.logout} className="py-2 px-2 border-gray-800 border-t w-full text-left hover:bg-gray-800 focus:outline-none rounded">Logout</button>
                        </div>
                    }
                </div>

            </div>
        );
    }

}
