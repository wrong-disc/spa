import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Playbar from '../components/Playbar';
import UserCard from '../components/UserCard';

import MyMusic from '../pages/music/MyMusic';
import Explore from '../pages/music/Explore';
import About from '../pages/about/About';
import Settings from '../pages/settings/Settings';

export default class RouterComponent extends React.Component {
  render () {
    return (
      <Router>
            <div className="bg-swoosh text-gray-900 antialiased font-sans w-full h-screen flex flex-col overflow-hidden">

              <div className="flex flex-1 overflow-hidden">
                <Sidebar/>

                <main className="flex-1 w-full overflow-y-auto">

                  <Switch>
                      <Route exact path="/">
                          <MyMusic />
                      </Route>
                      <Route path="/explore">
                          <Explore />
                      </Route>
                      <Route path="/about">
                          <About />
                      </Route>
                      <Route path="/settings">
                          <Settings />
                      </Route>
                  </Switch>

                </main>
              </div>

              <Playbar/>

              <div className="fixed top-0 right-0 mt-6 mr-6">
                <UserCard />
              </div>

            </div>
        </Router>
    );
  }
}
