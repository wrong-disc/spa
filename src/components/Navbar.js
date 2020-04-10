import React from 'react';
import {Link} from 'react-router-dom';

export default class NavbarComponent extends React.Component {

    render() {
        return (
            <nav className="bg-white px-4 py-2 border-b shadow-sm flex items-center justify-start">

                <div className="mr-4 text-lg font-bold tracking-tight">Wrong Disc</div>

                <Link to="/">
                    <div className="mx-1">Home</div>
                </Link>
                <Link to="/about">
                    <div className="mx-1">About</div>
                </Link>
            </nav>
        );
    }

}
