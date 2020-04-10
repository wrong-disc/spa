import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../components/Navbar';

import Home from '../pages/home/Home';
import About from '../pages/about/About';

export default class RouterComponent extends React.Component {
  render () {
    return (
      <Router>
            <div className="bg-gray-200 text-gray-900 antialiased font-sans w-screen h-screen flex flex-col">

              <Navbar/>

              <main className="w-full h-full">

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>

              </main>

            </div>
        </Router>
    );
  }
}
